import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    PointElement, LineElement,
    Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend
);

export default function LineChart() {
    return <div style={{width: '90%'}} className='m-auto'>
        <Line options={options} data={data}/>
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
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'];
const data = {
    labels,
    datasets: [
        {
            label: 'Thu',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 20000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Chi',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 20000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};