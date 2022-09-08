import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    BarElement, Title,
    Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from "faker";

ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend
);

export default function BarChart() {
    return <div style={{width: '90%'}} className='m-auto'>
        <Bar options={options} data={data}/>
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
            text: 'Biểu đồ thu/chi',
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
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
        },
        {
            label: 'Chi',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 20000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.9)',
        },
    ],
};