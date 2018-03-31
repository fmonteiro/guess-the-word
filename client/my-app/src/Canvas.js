import React, { Component } from "react";
import "./Canvas.css";

import { emitChanges, subscribeToChangesOnCanvas } from "./api";

class Canvas extends Component {
  constructor() {
    super();

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
    subscribeToChangesOnCanvas(this.updateCanvas);
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

    this.updateCanvas(this.lastX, this.lastY, e.offsetX, e.offsetY, true);

    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  };

  updateCanvas = (lastX, lastY, currX, currY, shouldEmitChanges) => {
    const ctx = this.canvasContext;

    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(currX, currY);
    ctx.stroke();

    if (shouldEmitChanges) {
      emitChanges(lastX, lastY, currX, currY);
    }
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

export default Canvas;
