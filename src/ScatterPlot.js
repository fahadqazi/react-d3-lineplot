import React, { Component } from "react";
import * as d3 from "d3";
import Axis from "./Axis";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xScale: d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, this.props.width]),
      yScale: d3
        .scaleLinear()
        .domain([0, 1])
        .range([this.props.height, 0])
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { xScale, yScale } = state;
    // xScale.range([0, props.width])
    // yScale.range([0, props.height])
    const data = props.data;
    return { ...state, xScale, yScale, data };
  }

  render() {
    const { x, y, data, width, height } = this.props;
    const { xScale, yScale } = this.state;
    // console.log('width & height: ', width, height, data)
    return (
      <g width={width} height={height} transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) => (
          <circle key={x} cx={xScale(x)} cy={yScale(y)} r="3" />
        ))}
        <Axis x={0} y={height} type="Bottom" scale={xScale} />
        <Axis x={0} y={0} type="Left" scale={yScale} />
      </g>
    );
  }
}

export default ScatterPlot;
