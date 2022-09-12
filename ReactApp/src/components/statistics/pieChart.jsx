import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { reduceRecordByCategory } from '../../utils/chartutils';

ChartJS.register(ArcElement, Tooltip, Legend);
const generateRandomColor = (start, num) => {
    const R_INTERVAL = 30
    const G_INTERVAL = 110
    const B_INTERVAL = 200
    const temp = [...Array(num).keys()].map(idx => {
        const r = (start + (idx + 1) * R_INTERVAL) % 255
        const g = (start + (idx + 1) * G_INTERVAL) % 255
        const b = (start + (idx + 1) * B_INTERVAL) % 255
        return `rgba(${r}, ${g}, ${b}, 0.8)`
    })
    console.log(temp)
    return temp
} 
const inBgColors = generateRandomColor(10, 20)


const exBgColors = generateRandomColor(90, 20)

const EMPTY_PIE_DATE = {
    labels: ['Rỗng (không có dự trù)'],
    datasets: [
        {
            data: [0]
        }
    ]
}

function generatePieData(records, isIncome){
    if(records.length == 0){
        return EMPTY_PIE_DATE
    }

    
    const reducedRecords = reduceRecordByCategory(records)

    const recordLabels = reducedRecords.map(t => t.category_name)
    
    return  {
        labels: recordLabels,
        datasets: [
            {
                label: '# of Votes',
                data: reducedRecords.map(t => t.sum),
                backgroundColor: isIncome ? inBgColors : exBgColors,
                borderColor: isIncome ? inBgColors : exBgColors,
                borderWidth: 1,
            },
        ],
    }
}



export default function PieChart({transactions, plannings}) {
    return <>
        <div className="d-flex m-0 p-0 justify-content-around mt-2">
            <CustomPie data={generatePieData(transactions.filter(t => t.category_type == 'income'), true)} title='Thu' />
            <CustomPie data={generatePieData(transactions.filter(t => t.category_type == 'expense'), false)} title='Chi' />
            <CustomPie data={generatePieData(plannings.filter(t => t.category_type == 'income'), true)} title='Dự trù thu' />
            <CustomPie data={generatePieData(plannings.filter(t => t.category_type == 'expense'), false)} title='Dự trù chi' />
        </div>
    </>
}

function CustomPie({ data, title }) {
    return <div className='rounded-3 p-3 border border-1' style={{ width: '47%' }}>
        <h5>{title}</h5>
        <hr />
        <div className='px-3 w-75 mx-auto'>
            <Pie data={data} />
        </div>
        <hr />
        <span className='text-primary text-decoration-underline hover'>
            Chi tiết {'>'}
        </span>
    </div>
}