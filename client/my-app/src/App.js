import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeToTimer } from "./api";
import Board from "./Board";

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }
  
  state = {
    timestamp: "no timestamp yet"
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        <Board></Board>
      </div>
    );
  }
}

export default App;
