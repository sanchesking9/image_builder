import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';
import {clipByName} from '../../Utils';
if (process.env.WEBPACK) require('./css/AddImage.scss');

@connect((state) => {
  const {image} = state;
  return {image};
})
export default class AddImage extends Component {
  _handleImageChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.addImage(reader.result);
    };

    reader.readAsDataURL(file);
    this.refs.file.value = null;
  }

  addImage = (dataURL) => {
    const fjs = this.props.fabric;
    const {frame} = this.props.image;
    const img = document.createElement("IMG");
    img.onload = () => {
      var fImg = new fjs.Image(img, {
        scaleX: 0.2,
        scaleY: 0.2,
        clipTo: function(ctx) {
          return clipByName.bind(fImg, ctx, frame)();
        }
      });
      this.props.canvas.add(fImg);
    };
    img.src = dataURL;
  };

  render() {
    return (<div className="add-image">
      <Button>Add image</Button>
      <input ref="file" type="file" ref="file" onChange={(event)=>this._handleImageChange(event)} />
    </div>);
  }
}
