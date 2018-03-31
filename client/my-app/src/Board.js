import React, { Component } from "react";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    this.canvasContext = null;
    this.canvasWidth = 650;
    this.canvasHeight = 350;

    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    this.setCanvasElemRef = element => {
      this.canvas = element;
    };
  }

  componentDidMount = () => {
    this.setupCanvas();
  };

  setupCanvas = () => {
    this.canvasContext = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousedown", e => {
      this.isDrawing = true;
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
    });

    this.canvas.addEventListener("mousemove", this.draw);
    this.canvas.addEventListener("mouseup", () => (this.isDrawing = false));
    this.canvas.addEventListener("mouseout", () => (this.isDrawing = false));

    this.canvasContext.lineWidth = 5;
  };

  draw = e => {
    if (!this.isDrawing) return;

    const ctx = this.canvasContext;

    ctx.beginPath();
    // start from
    ctx.moveTo(this.lastX, this.lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  };

  render() {
    return (
      <canvas
        ref={this.setCanvasElemRef}
        width={this.canvasWidth}
        height={this.canvasHeight}
        className="drawing-board"
        onClick={this.draw}
      />
    );
  }
}

export default Board;
