import React from "react";
import * as d3 from "d3";

class Axis extends React.Component {
  constructor() {
    super();
    this.gRef = React.createRef();
  }

  componentDidUpdate() {
    this.d3Render();
  }

  componentDidMount() {
    this.d3Render();
  }

  d3Render() {
    const { type } = this.props;

    d3.select(this.gRef.current).call(d3[`axis${type}`](this.props.scale));
  }

  render() {
    const { x, y } = this.props;

    return <g ref={this.gRef} transform={`translate(${x}, ${y})`} />;
  }
}

export default Axis;
