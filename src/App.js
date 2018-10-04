import React, { Component } from "react";
import ScatterPlot from "./ScatterPlot";
import LineChart from "./LineChart";
import * as d3 from "d3";
import "./App.css";

const data = d3.range(100).map(_ => [Math.random(), Math.random()]);

const genData = function() {
  return d3.range(100).map(_ => [Math.random(), Math.random()]);
};

const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const genTimeData = function() {
  const arr = [];
  const duration = 500;
  const maxLength = 100;
  const now = new Date();
  for (let i = 0; i < maxLength; i++) {
    arr.push({
      x: new Date(now.getTime() - (maxLength - i) * duration),
      y: randomNumbers(90, 100)
    });
  }
  return arr;
};

const getDataPoint = function() {
  return {
    x: new Date(),
    y: randomNumbers(90, 100)
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 300,
      height: 200,
      data: genTimeData()
    };
    this.updateData = this.updateData.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({
      data: this.updateData()
    });
  }

  updateData() {
    var newOne = Object.assign(this.state.data);
    newOne.push(getDataPoint());
    newOne.shift();
    // console.log(newOne, newOne.length);
    return newOne;
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <svg width={800} height={800}>
          <LineChart
            className="chart"
            x={50}
            y={50}
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
          />
        </svg>
      </div>
    );
  }
}

export default App;
