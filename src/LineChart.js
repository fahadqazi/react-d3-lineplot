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
      // data: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { xScale, yScale } = prevState;
    // let { data } = nextProps;
    xScale.domain([
      d3.min(nextProps.data, d => d.x),
      d3.max(nextProps.data, d => d.x)
    ]);
    yScale.domain([
      d3.min(nextProps.data, d => d.y),
      d3.max(nextProps.data, d => d.y)
    ]);

    prevState = { ...prevState, xScale, yScale };
    return prevState;
  }

  get line() {
    return d3
      .line()
      .curve(d3.curveBasis)
      .x(d => this.state.xScale(d.x))
      .y(d => this.state.yScale(d.y));
  }

  lineRef = React.createRef();

  componentDidUpdate() {
    let el = d3.select(this.lineRef.current);

    el.transition()
      .duration(800)
      .ease(d3.easeLinear)
      .attr("d", this.line(this.props.data))
      .on("end", () => {
        console.log("ending");
        this.setState({
          data: this.props.data
        });
      });
  }

  render() {
    const { x, y, width, height } = this.props;
    const { xScale, yScale } = this.state;
    return (
      <div className="chart">
        <svg width={300} height={300}>
          <g width={width} height={height} transform={`${x}, ${y}`}>
            <path
              className="line"
              d={this.line(this.props.data)}
              ref={this.lineRef}
            />
            <Axis x={0} y={height} type="Bottom" scale={xScale} />
            <Axis x={0} y={0} type="Left" scale={yScale} />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
