import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js/auto'

// Register the chart.js scales
registerables.forEach((item) => Chart.register(item))

type BarGraphProps = {
    dataPoints: { y: number; label: string }[]
    label: string
    verticalLabel: string
}

function max(arr: any) {
    let maxValue = 10
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].y > maxValue) {
            maxValue = arr[i].y
        }
    }
    const numDigits = String(maxValue).length

    const orderOfMagnitude = Math.pow(10, numDigits - 1)
    const roundedValue =
        Math.ceil(maxValue / orderOfMagnitude) * orderOfMagnitude
    return roundedValue
}
const BarGraph = (props: BarGraphProps) => {
    const { dataPoints, label, verticalLabel } = props
    let maxrer = max(dataPoints)

    // Example usage:
    const data = {
        labels: dataPoints.map((dataPoint) => dataPoint.label),

        datasets: [
            {
                label: label,
                data: dataPoints.map((dataPoint) => dataPoint.y),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        indexAxis: 'y', // Set the indexAxis to 'y' to display bars horizontally
        scales: {
            x: {
                min: 0,
                max: maxrer,
                type: 'linear',
                beginAtZero: true,
                title: {
                    display: true,
                    text: verticalLabel,
                },
            },
        },
    } as const // Use 'as const' to assert the exact type

    return (
        <div className=' '>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarGraph
