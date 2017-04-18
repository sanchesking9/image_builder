import React, { Component } from 'react';
if (process.env.WEBPACK) { var fabric = require('fabric');}
if (process.env.WEBPACK) require('./css/Image.scss');
import ControlContainer from './ControlsContainer';
import { connect } from 'react-redux';
import {setConfig} from '../actions/image';

@connect((state) => {
  const {image} = state;
  return {image};
}, {setConfig})
export default class Image extends Component {
  componentDidMount() {
    process.env.WEBPACK && this.initFabric();
    process.env.WEBPACK && this.getConfigs();
  }

  state = {
    color: '#fff',
    config: {}
  };

  canvasObj = {};

  getConfigs() {
    fetch('/image_builder_config.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({config: data});
        this.addBackground();
      });
  }

  addBackground = () => {
    const fjs = fabric.fabric;
    const imgUrl = this.state.config.background;
    const canvas = this.canvasObj;

    fjs.Image.fromURL(imgUrl, function(oImg) {
      oImg.setWidth(canvas.width);
      oImg.setHeight(canvas.height);
      canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0
      });
    });
  };

  initFabric() {
    const fjs = fabric.fabric;
    const canvas = this.canvasObj = new fjs.Canvas('canvas');

    canvas.on('object:moving', (e) => {
      const obj = e.target;
      let angleLeft = 0;
      let realLeft = obj.left;
      let diagonal = Math.sqrt(Math.pow(e.target.width * e.target.scaleX, 2) + Math.pow(e.target.height * e.target.scaleY, 2));
      console.log(e.target, 'angle=',  e.target.angle, 'top=', obj.top, 'left=', obj.left, 'width=', e.target.width, 'height=', e.target.height);

      if (e.target.angle < 46 && e.target.angle !== 0) {
        angleLeft = (diagonal * (e.target.angle / 0.45 / 100)) / 2;
      }
      realLeft = realLeft - angleLeft;
      console.log('realLeft=', realLeft, 'angleLeft=', angleLeft, 'obj.left=', obj.left, 'diagonal=', diagonal);

      if (realLeft < 0) {
        obj.setLeft(angleLeft);
      }

      if (obj.top < 0) {
        obj.setTop(0);
      }

      if (obj.height * obj.scaleY + obj.top > e.target.canvas.height) {
        const top = e.target.canvas.height - obj.height * obj.scaleY;
        console.log('top', top);
        top > 0 && obj.setTop(top);
      }

      if (obj.width * obj.scaleX + obj.left > e.target.canvas.width) {
        const left = e.target.canvas.width - obj.width * obj.scaleX;
        console.log('left', left);
        left > 0 && obj.setLeft(left);
      }
    });
  }

  render() {
    const {config} = this.state;
    return (<div className="image">
      <h1>{config.title}</h1>
      <div className="image-canvas-container">
        <canvas id="canvas" width="300" height="300"></canvas>
        {process.env.WEBPACK && <ControlContainer config={config} fabric={fabric.fabric} canvas={this.canvasObj}/>}
      </div>
    </div>);
  }
}
