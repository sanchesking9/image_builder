import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';
import {clipByName} from '../../Utils';

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddCircle extends Component {
  addCircle = () => {
    let {frame} = this.props.image;

    const fjs = this.props.fabric;
    const circle = new fjs.Circle({
      radius: 20,
      left: 100,
      top: 100,
      hasBorders: false,
      originX: "center",
      originY: "center",
      fill: this.props.image.color,
      clipTo: function(ctx) {
        return clipByName.bind(circle, ctx, frame)();
      }
    });
    this.props.canvas.add(circle);
  };

  render() {
    return (<div>
      <Button onClick={this.addCircle.bind(this)}>Add circle</Button>
    </div>);
  }
}
