import React, { Component } from 'react';
import Modal from '../Modal';

import { connectToServer } from "../Api";

class ConnectionPrompt extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            ip: 'localhost:8000',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const { startGame } = this.props;
        event.preventDefault();
        this.setState({isLoading: true});
        connectToServer(this.state.ip);
        this.setState({ isLoading: false });
        startGame(this.state.ip);
    }

    handleChange(event) {
        this.setState({ip: event.target.value});
    }

    render() {
        return (
            <Modal isShown={ this.props.isShown }>
                Olá eu sou um teste!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Ip:
                        <input type="text" value={this.state.ip} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Modal>
        );
    }
}

export default ConnectionPrompt;
