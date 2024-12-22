import React, { Component } from "react"
import ChartistGraph from "react-chartist"

class lineareachart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("series Data =>", this.props?.data)
    var lineChartData = {
      labels: this.props?.data?.map(el => el?.month),
      series: [this.props?.data?.map(el => el?.earning)],
    }
    var lineChartOptions = {
      low: 0,
      showArea: true,
    }
    return (
      <React.Fragment>
        {this.props?.data && (
          <ChartistGraph
            data={lineChartData}
            style={{ height: "300px" }}
            options={lineChartOptions}
            type={"Line"}
          />
        )}
      </React.Fragment>
    )
  }
}

export default lineareachart
