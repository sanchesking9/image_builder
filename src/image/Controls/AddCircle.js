import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddCircle extends Component {
  addCircle = () => {
    const fjs = this.props.fabric;
    const circle = new fjs.Circle({
      radius: 20,
      left: 100,
      top: 100,
      hasBorders: false,
      originX: "center",
      originY: "center",
      fill: this.props.image.color
    });
    this.props.canvas.add(circle);
  };

  render() {
    return (<div>
      <Button onClick={this.addCircle}>Add circle</Button>
    </div>);
  }
}
