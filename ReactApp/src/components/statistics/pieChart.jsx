import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { reduceRecordByCategory } from '../../utils/chartutils';

ChartJS.register(ArcElement, Tooltip, Legend);
const backgroundColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
]

const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
]

const EMPTY_PIE_DATE = {
    labels: ['Rỗng (không có dự trù)'],
    datasets: [
        {
            data: [0]
        }
    ]
}

function generatePieData(records){
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
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    }
}



export default function PieChart({transactions, plannings}) {
    return <>
        <div className="d-flex m-0 p-0 justify-content-around mt-2">
            <CustomPie data={generatePieData(transactions.filter(t => t.category_type == 'income'))} title='Thu' />
            <CustomPie data={generatePieData(plannings.filter(t => t.category_type == 'income'))} title='Dự trù thu' />
        </div>
        <div className="d-flex m-0 p-0 justify-content-around mt-2">
            <CustomPie data={generatePieData(transactions.filter(t => t.category_type == 'expense'))} title='Chi' />
            <CustomPie data={generatePieData(plannings.filter(t => t.category_type == 'expense'))} title='Dự trù chi' />
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

const incomeData = {
    labels: ['Góp quỹ', 'Dự án', 'Đề tài', 'Sản phẩm'],
    datasets: [
        {
            label: '# of Votes',
            data: [300 * 18, 20000, 18000, 70000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 3)',
            ],
            borderWidth: 1,
        },
    ],
};



const expenseData = {
    labels: ['Tiền nhà', 'Điện', 'Nước', 'Sinh hoạt phí', 'Thiết bị'],
    datasets: [
        {
            label: '# of Votes',
            data: [5000, 400, 100, 10000, 15000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
        },
    ],
};