import React, { Component } from 'react';
if (process.env.WEBPACK) require('./style.scss');

export default class Button extends Component {
  click = (event) => {
    event.preventDefault();
    this.props.onClick && this.props.onClick();
  };

  render() {
    const {type = 'round'} = this.props;
    return <button className={'button ' + type} onClick={this.click}>{this.props.children}</button>;
  }
}
