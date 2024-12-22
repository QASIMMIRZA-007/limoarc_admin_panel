import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class RadialChart extends Component {
  constructor(props) {
    // console.log("series Data =>",seriesData);
    super(props)
    this.state = {
      options: {
        plotOptions: {
          radialBar: {
            hollow: {
              size: "45%",
            },
            dataLabels: {
              value: {
                show: false,
              },
            },
          },
        },
        colors: ["rgb(2, 164, 153)"],
        labels: [""],
      },
      series: [this.props?.seriesData],
    }
  }

  render() {
    console.log("this.props.seriesData", this.props?.seriesData)
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          type="radialBar"
          series={this.state.series}
          height="140px"
        />
      </React.Fragment>
    )
  }
}

export default RadialChart
