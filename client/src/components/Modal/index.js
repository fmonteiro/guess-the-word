import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super();

    this.state = {
      isShown: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.isShown !== nextProps.isShown
      ? { ...prevState, isShown: nextProps.isShown }
      : "";
  }

  render() {
    return (
      <div
        className="Modal"
        style={{ visibility: this.state.isShown ? "visible" : "hidden" }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
