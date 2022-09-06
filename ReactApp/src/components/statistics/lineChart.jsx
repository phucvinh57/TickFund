import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    PointElement, LineElement,
    Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker'
import { ISO8601_week_no } from '../../utils/utils';
import { calculateTotal, genInRangeDataSetWithMissing, genOutRangeDataSet, getRecordLabel, mergePlanningByTime, reduceRecordByTime, translateDateUnit } from '../../utils/chartutils';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend
);

function generateLineData(filter, transactions, plannings, prevBalance){
    if(filter === null || (transactions.length == 0 && plannings.length == 0)) {
        return {
            datasets: []
        }
    }

    const reducedTransaction = reduceRecordByTime(transactions)
    const reducedPlanning = reduceRecordByTime(plannings)
    const mergeDateSet = mergePlanningByTime(transactions, plannings)

    const inRangeExpense = genInRangeDataSetWithMissing(filter, reducedTransaction.filter(p => p.category_type === 'expense'))
    const inRangeIncome = genInRangeDataSetWithMissing(filter, reducedTransaction.filter(p => p.category_type === 'income'))
    const inRangeExpensePlanning = genInRangeDataSetWithMissing(filter, reducedPlanning.filter(p => p.category_type === 'expense'))
    const inRangeIncomePlanning = genInRangeDataSetWithMissing(filter, reducedPlanning.filter(p => p.category_type === 'income'))

    var labels = []
    const outRangeExpensePlanning = genOutRangeDataSet(filter, reducedPlanning.filter(p => p.category_type === 'expense'))
    const outRangeIncomePlanning = genOutRangeDataSet(filter, reducedPlanning.filter(p => p.category_type === 'income'))
    
    const inRangeMergeExpense = genInRangeDataSetWithMissing(filter, mergeDateSet.filter(m => m.category_type === 'expense'))
    const inRangeMergeIncome = genInRangeDataSetWithMissing(filter, mergeDateSet.filter(m => m.category_type === 'income'))
    const outRangeMergeExpense = genOutRangeDataSet(filter, mergeDateSet.filter(m => m.category_type === 'expense'))
    const outRangeMergeIncome = genOutRangeDataSet(filter, mergeDateSet.filter(m => m.category_type === 'income'))


    const mergeIncome = [...outRangeMergeIncome, ...inRangeMergeIncome]
    const mergeExpense = [...outRangeMergeExpense, ...inRangeMergeExpense]

    
    const total = calculateTotal(
                            inRangeIncome.map(ele => ele.y),
                            inRangeExpense.map(ele => ele.y),
                            prevBalance)
                            .map((ele, idx) => ({
                                x: inRangeIncome[idx].x,
                                y: ele
                            }))
    const totalWithPlanning = calculateTotal(
                            mergeIncome.map(ele => ele.y),
                            mergeExpense.map(ele => ele.y),
                            prevBalance)
                            .map((ele, idx) => ({
                                x: mergeIncome[idx].x,
                                y: ele
                            }))

    console.log(totalWithPlanning)

    if(outRangeExpensePlanning.length > outRangeIncomePlanning){
        const inRangeLabels = inRangeExpense.map(it => it.x)
        const outRangeLables = outRangeExpensePlanning.map(it => it.x)
        labels = [...outRangeLables, ...inRangeLabels]
    }
    else {
        const inRangeLabels = inRangeExpense.map(it => it.x)
        const outRangeLables = outRangeIncomePlanning.map(it => it.x)
        labels = [...outRangeLables, ...inRangeLabels]
    }


    return {
        labels: labels,
        datasets: [
            {
                
                label: 'Tổng quỹ',
                data: total,
                borderColor: 'rgb(44, 58, 150)',
                backgroundColor: 'rgba(44, 58, 150, 0.5)',
            },
            {
                
                label: 'Tổng quỹ có tính dự trù',
                data: totalWithPlanning,
                borderColor: 'rgb(181, 199, 204)',
                backgroundColor: 'rgba(181, 199, 204, 0.5)',
            },
            {
                
                label: 'Chi',
                data: inRangeExpense,
                hidden: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Thu',
                data: inRangeIncome,
                hidden: true,
                borderColor: 'rgb(0, 255, 0)',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
            },
            {
                label: 'Dự trù chi',
                data: [...outRangeExpensePlanning, ...inRangeExpensePlanning],
                hidden: true,
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
            {
                label: 'Dự trù thu',
                data: [...outRangeIncomePlanning, ...inRangeIncomePlanning],
                hidden: true,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Chi có tính dự trù',
                data: mergeExpense,
                hidden: true,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
                label: 'Thu có tính dự trù',
                data: mergeIncome,
                hidden: true,
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 205, 86, 0.5)',
            },
        ],
    };
}

export default function LineChart({title, filter, transactions, plannings, prevBalance = 0}) {
    return <div style={{width: '90%'}} className='m-auto'>
        <Line 
            options = {{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title ? title : 'Chart.js Line Chart',
                    },
                },
            
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Số tiền (VNĐ)"
                        }
                    },
                    x : {
                        title: {
                            display: true,
                            text: filter ? translateDateUnit(filter.interval) : ''
                        }
                    }
                }     
            }}
            
            data={generateLineData(filter, transactions, plannings, prevBalance)}/>
    </div>
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },

    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "hello"
            }
        }
    }     
};

export const compareRecord = (a, b) => {
    const aLabel = getRecordLabel(a)
    const bLabel = getRecordLabel(b)

    if(aLabel === bLabel) return 0
    else return aLabel > bLabel
}