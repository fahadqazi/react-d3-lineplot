import React, { Component } from "react";
// import ScatterPlot from "./ScatterPlot";
import LineChart from "./LineChart";
// import * as d3 from "d3";
import "./App.css";


const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const genTimeData = function() {
  const arr = [];
  const duration = 500;
  const maxLength = 100;
  const now = new Date();
  // const obj = {};
  for (let i = 0; i < maxLength; i++) {
    arr.push({
      x: new Date(now.getTime() - (maxLength - i) * duration),
      y: randomNumbers(90, 100)
    });
  }
  return arr;
};

const createDataObject = function() {
  var newArr = [];
  for (let i = 0; i < 10; i++) {
    newArr.push(genTimeData());
  }
  return newArr;
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
      data: createDataObject()
    };
    this.updateData = this.updateData.bind(this);
    this.tick = this.tick.bind(this);
    this.renderDivs = this.renderDivs.bind(this);
  }

  tick() {
    this.setState({
      data: this.updateData()
    });
  }

  updateData() {
    var newData = this.state.data.map(i => {
      var newItem = i.splice(0)
      newItem.push(getDataPoint())
      newItem.shift()
      return newItem
    })
    return newData;
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  renderDivs() {
    var chartDiv = this.state.data.map(item => {
      return (
        <div>
          <LineChart
            x={50}
            y={50}
            data={item}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
      );
    })

    return chartDiv;
  }

  render() {
    return <div className="container">{this.renderDivs()}</div>;
  }
}

export default App;
