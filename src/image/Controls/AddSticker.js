import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clipByName} from '../../Utils';
import Button from '../components/button';
if (process.env.WEBPACK) require('./css/AddSticker.scss');

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddSticker extends Component {
  state = {
    showPopup: false
  };
  showSticker = () => {
    this.setState({showPopup: !this.state.showPopup})
  };

  addImage = (dataURL) => {
    const fjs = this.props.fabric;
    const {frame = {}} = this.props.image;
    const {left = 80, top = 80} = frame;
    const img = document.createElement("IMG");
    this.setState({showPopup: false});
    img.onload = () => {
      var fImg = new fjs.Image(img, {
        top : top,
        left : left,
        scaleX: 0.5,
        scaleY: 0.5,
        clipTo: function(ctx) {
          return clipByName.bind(fImg, ctx, frame)();
        }
      });
      this.props.canvas.add(fImg);
    };
    img.src = dataURL;
  };

  render() {
    const {config} = this.props.image;
    console.log(config);
    return (<div className="AddSticker">
      <Button onClick={this.showSticker}>Add sticker</Button>
      {this.state.showPopup && <div className="sticker-popup">
        {config.config && config.config.stickers && config.config.stickers.map((item) => {
          return <div onClick={this.addImage.bind(this, item)}><img src={item} /></div>
        })}
      </div>}
    </div>);
  }
}
