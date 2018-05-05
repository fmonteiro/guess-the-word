import React, { Component } from "react";
import "./Chat.css";
import { emitChangesOnChat, subscribeToChangesOnChat } from "../Api";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { sender: "user01", text: "message01" },
        { sender: "user02", text: "message02" },
        { sender: "user03", text: "message03" }
      ],
      sender: "user04",
      text: ""
    };
  }

  componentDidMount() {
    subscribeToChangesOnChat(this.updateChat);
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { sender, text } = this.state;
    this.setState({
      messages: [...this.state.messages, { sender, text }],
      text: ""
    });
    emitChangesOnChat({ sender, text });
  };

  updateChat = message => {
    const { sender, text } = message;
    this.setState({
      messages: [...this.state.messages, { sender, text }]
    });
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="chat-container">
        <h2 className="title">Chat</h2>
        <ul className="messages-container">
          {messages.map((message, i) => {
            return (
              <div key={i} className="message">
                <li key={i}>
                  <strong>{message.sender}: </strong>
                  {message.text}
                </li>
              </div>
            );
          })}
        </ul>
        <div className="chat-input">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
