// import React, { Component } from 'react';
// import { Doughnut } from 'react-chartjs-2';

// class DountChart extends Component {
//     render() {
//         const data = {
//             labels: [
//                 "Desktops",
//                 "Tablets"
//             ],
//             datasets: [
//                 {
//                     data: [300, 210],
//                     backgroundColor: [
//                         "#09BA7E",
//                         "#D2C091",
//                         "#4083F8",
//                         "#FF5A20",
//                     ],
//                     hoverBackgroundColor: [
//                         "#09BA7E",
//                         "#D2C091",
//                         "#4083F8",
//                         "#FF5A20",
//                     ],
//                     hoverBorderColor: "#fff"
//                 }]
//         };

//         const option = {
//             tooltips: {
//                 callbacks: {
//                     label: function (tooltipItem, data) {
//                         var dataset = data.datasets[tooltipItem.datasetIndex];
//                         var meta = dataset._meta[Object.keys(dataset._meta)[0]];
//                         var total = meta.total;
//                         var currentValue = dataset.data[tooltipItem.index];
//                         var percentage = parseFloat((currentValue / total * 100).toFixed(1));
//                         return currentValue + ' (' + percentage + '%)';
//                     },
//                     title: function (tooltipItem, data) {
//                         return data.labels[tooltipItem[0].index];
//                     }
//                 }
//             }
//         }
//         return (
//             <React.Fragment>
                
//                 <Doughnut width={300} height={215} data={data} options={option} />
//             </React.Fragment>
//         );
//     }
// }

// export default DountChart;


import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class DountChart extends React.Component {
    render() {
        const data = {
            labels: [
                "Airport Transfer",
                "City Ride",
                "Hourly Rating",
                "Event Services"
            ],
            datasets: [
                {
                    data: [30, 20, 40, 10], 
                    backgroundColor: [
                        "#09BA7E", 
                        "#D2C091", 
                        "#4083F8", 
                        "#FF5A20"  
                    ],
                    hoverBackgroundColor: [
                        "#09BA7E",
                        "#D2C091",
                        "#4083F8",
                        "#FF5A20"
                    ],
                    hoverBorderColor: "#fff"
                }
            ]
        };

        const options = {
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
                            return `${currentValue}% (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '90%', 
            responsive: true,
            maintainAspectRatio: false
        };

        return (
            <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                <Doughnut data={data} options={options} />
                {/* <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    <div>75% ↑</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>All Time</div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    textAlign: 'right'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#09BA7E', marginRight: '8px' }}></span>
                        Airport Transfer 30%
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#D2C091', marginRight: '8px' }}></span>
                        City Ride 20%
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#4083F8', marginRight: '8px' }}></span>
                        Hourly Rating 40%
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#FF5A20', marginRight: '8px' }}></span>
                        Event Services 10%
                    </div>
                </div> */}
            </div>
        );
    }
}

export default DountChart;
