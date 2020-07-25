import React from 'react';
import { Bar } from 'react-chartjs-2';

const barChart = ( props ) => {
    const { labels, data } = props;

    let labelArray = [];
    let dataArray = [];

    for ( let option in labels ) {
        labelArray.push(labels[option].option);
    };

    for ( let key in data ) {
        dataArray.push(data[key]);
    };

    return (
        <div>
            <Bar
                data={{
                    labels: labelArray,
                    datasets: [{
                        barPercentage: 0.4,
                        data: dataArray,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(25, 252, 208, 0.2)',
                            'rgba(206, 233, 68, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(25, 252, 208, 1)',
                            'rgba(206, 233, 68, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height={300}
                options={{
                    title: {
                        display: true,
                        fontSize: 25,
                        text: props.title
                    },
                    legend: false,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                text: 'Numero de personas'
                            },
                            ticks: {
                                beginAtZero: true,
                                callback: function(value) {if (value % 1 === 0) { return value; }}
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    responsive: true
                }}
            />
        </div>
    )
}

export default barChart;
