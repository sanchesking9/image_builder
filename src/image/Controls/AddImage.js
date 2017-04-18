import React, { Component } from 'react';
import Button from '../components/button';
if (process.env.WEBPACK) require('./css/AddImage.scss');

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
    const img = document.createElement("IMG");
    img.onload = () => {
      var fImg = new fjs.Image(img, {
        scaleX: 0.2,
        scaleY: 0.2
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
