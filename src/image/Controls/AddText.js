import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';
import {clipByName} from '../../Utils';

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddText extends Component {
  addText = () => {
    let {frame} = this.props.image;
    const fjs = this.props.fabric;
    const inputText = 'Edit text';
    const text = new fjs.IText(inputText, {
      left: 20, //Take the block's position
      top: 20,
      fill: this.props.image.color ? this.props.image.color : 'white',
      clipTo: function(ctx) {
        return clipByName.bind(text, ctx, frame)();
      }
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
