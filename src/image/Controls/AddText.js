import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddText extends Component {
  addText = () => {
    const fjs = this.props.fabric;
    const inputText = 'Edit text';
    const text = new fjs.IText(inputText, {
      left: 20, //Take the block's position
      top: 20,
      fill: this.props.image.color ? this.props.image.color : 'white'
    });
    this.props.canvas.add(text).setActiveObject(text);
    text.selectAll();
    text.enterEditing();
  };

  render() {
    return (<div>
      <Button onClick={this.addText}>Add text</Button>
    </div>);
  }
}
