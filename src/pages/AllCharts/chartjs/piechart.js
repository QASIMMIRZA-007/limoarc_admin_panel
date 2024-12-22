import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {

    render() {
        const data = {
            labels: [
                "Desktop",
                "Tablets",
                "hello",
                "hello",
              
            ],
            datasets: [
                {
                    data: [300, 180],
                    backgroundColor: [
                        "#02a499",
                        "#ebeff2"
                    ],
                    hoverBackgroundColor: [
                        "#02a499",
                        "#ebeff2"
                    ],
                    hoverBorderColor: "#fff"
                }]
        };

        
        const option = {
            plugins: {
                legend: {
                    display: false 
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const total = dataset.data.reduce((acc, value) => acc + value, 0);
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            const percentage = ((currentValue / total) * 100).toFixed(1);
                            return `${currentValue} (${percentage}%)`;
                        },
                        title: function (tooltipItem) {
                            return tooltipItem[0].label;
                        }
                    }
                }
            }
        };
        return (
            <React.Fragment>
                <Pie width={300} height={215} data={data} options={option} />
            </React.Fragment>
        );
    }
}

export default PieChart;   