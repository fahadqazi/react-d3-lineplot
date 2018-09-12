import React, { Component } from 'react';
import ScatterPlot from './ScatterPlot';
import LineChart from './LineChart';
import * as d3 from 'd3'
import './App.css';

const data = d3.range(100).map(_ => [Math.random(), Math.random()])

const genData = function(){
  return d3.range(100).map(_ => [Math.random(), Math.random()])
}

const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const genTimeData = function(){
  const arr = []
  const duration = 500
  const maxLength = 10
  const now = new Date()
  for (let i=0; i<maxLength; i++){
    arr.push({
      x: new Date(now.getTime() - (maxLength - i) * duration),
      y: randomNumbers(90, 100)
    })
  }
  return arr;
}

console.log('GenTimeDate: ', genTimeData())

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: 300,
      height: 200
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({
      data: genData()
    })
  }

  render() {
    // console.log('this.state: ', this.state)
    return (
      <div className="App">
        <svg width={800} height={800} onClick={this.handleClick}>
          {/*<ScatterPlot className='chart' x={50} y={50} data={genData()} width={this.state.width} height={this.state.height}/>*/}
          <LineChart className='chart' x={50} y={50} data={genTimeData()} width={this.state.width} height={this.state.height}/>
        </svg>
      </div>
    );
  }
}

export default App;
