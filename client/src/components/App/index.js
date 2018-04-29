import React, { Component } from "react";
import Canvas from "../Canvas";
import ConnectionPrompt from "../ConnectionPrompt";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      ip: "localhost:8000"
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame(ip) {
    this.setState({ isReady: true, ip });
  }

  render() {
    return (
      <div className="App">
          {this.state.isReady ? (
              <Canvas ip={ this.state.ip }/>
          ) : (
              <ConnectionPrompt
                  isShown={!this.state.isReady}
                  startGame={this.startGame}
                  isReady={this.state.isReady}
              />
          )}
      </div>
    );
  }
}

export default App;
