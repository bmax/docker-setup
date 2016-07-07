import React, { Component } from 'react';

export default class Chat extends Component {
  render() {
    const { style, messages } = this.props;
    const ulStyle = {
      padding: 0,
      listStyleType: 'none',
      overflowY: 'scroll'
    };
    return (
      <div style={style}>
        <ul style={ulStyle}>{this.renderMessages(messages)}</ul>
        <input ref='input' type='text' onKeyPress={this.sendMessage.bind(this)} />
      </div>
    );
  }

  renderMessages(messages) {
    return messages.map(
      message => <Message {...message} />
    )
  }

  sendMessage(event) {
    if(event.key !== 'Enter') return;
    event.preventDefault();
    const input = this.refs.input.value.trim();
    this.refs.input.value = '';
    this.props.sendMessage(input);
  }
}

const Message = ({time, sender, message, style}) => (
  <li style={style}>[{time}][{sender}]: {message}</li>
)
