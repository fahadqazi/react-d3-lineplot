import React, { Component } from "react";
import * as d3 from "d3";
import Axis from "./Axis";
import "./App.css";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xScale: d3
        .scaleTime()
        .domain([
          d3.min(this.props.data, d => d.x, d3.max(this.props.data, d => d.x))
        ])
        .range([0, this.props.width]),
      yScale: d3
        .scaleLinear()
        .domain([
          d3.min(this.props.data, d => d.y),
          d3.max(this.props.data, d => d.y)
        ])
        .range([this.props.height, 0])
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { xScale, yScale } = state;
    let { data } = props;
    xScale.domain([d3.min(props.data, d => d.x), d3.max(props.data, d => d.x)]);
    yScale.domain([d3.min(props.data, d => d.y), d3.max(props.data, d => d.y)]);

    return { state, xScale, yScale, data };
  }

  get line() {
    return d3
      .line()
      .curve(d3.curveBasis)
      .x(d => this.state.xScale(d.x))
      .y(d => this.state.yScale(d.y));
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  render() {
    const { x, y, width, height } = this.props;
    const { xScale, yScale } = this.state;
    return (
      <div className="chart">
        <svg width={300} height={300}>
          <g width={width} height={height} transform={`${x}, ${y}`}>
            <path className="line" d={this.line(this.state.data)} />
            <Axis x={0} y={height} type="Bottom" scale={xScale} />
            <Axis x={0} y={0} type="Left" scale={yScale} />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
