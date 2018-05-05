import React, { Component } from "react";
import Canvas from "../Canvas";
import Chat from "../Chat";
import ConnectionPrompt from "../ConnectionPrompt";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      ip: "localhost:8000"
    };
  }

  startGame = (ip) => {
    this.setState({ isReady: true, ip });
  }

  render() {
    return (
      <div className="App">
        {this.state.isReady ? (
          <div className="main-container">
            <Canvas ip={this.state.ip} />
            <Chat />
          </div>
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
