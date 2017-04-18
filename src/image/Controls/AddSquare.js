import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddSquare extends Component {
  addSquare = () => {
    const fjs = this.props.fabric;
    const rect = new fjs.Rect({
      top : 100,
      left : 100,
      width : 100,
      height : 100,
      fill : this.props.image.color
    });
    this.props.canvas.add(rect);
  };

  render() {
    return (<div>
      <Button onClick={this.addSquare}>Add square</Button>
    </div>);
  }
}
