import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Apexdonut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '45%',
                        },
                        dataLabels: {
                            value: {
                                show: false
                            }
                        }
                    },
                },
                colors: ['rgb(2, 164, 153)'],
                labels: ['']
            },
            series: [props.seriesData == undefined ? 0 : props.seriesData],
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="140px" />
            </React.Fragment>
        );
    }
}

export default Apexdonut;