import React, { Component } from 'react';
if (process.env.WEBPACK) { var fabric = require('fabric');}
if (process.env.WEBPACK) require('./css/Image.scss');
import ControlContainer from './ControlsContainer';
import { connect } from 'react-redux';
import {setConfig, setFrame} from '../actions/image';
import RotatePreview from './RotatePreview/RotatePreview';

@connect((state) => {
  const {image} = state;
  return {image};
}, {setConfig, setFrame})
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
        this.props.setConfig({config: data});
        this.addBackground();
        this.addFrame();
      });
  }

  makeCanvas(img) {
    this.addBackground(img);
    this.addFrame();
  }

  addBackground = (img) => {
    const fjs = fabric.fabric;
    const imgUrl = img || this.state.config.background;
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

  addFrame() {
    const fjs = fabric.fabric;
    const canvas = this.canvasObj;
    const frame = this.state.config.frame;
    const defaultConfig = {
      width: 100,
      height: 100,
      fill: 'rgba(0, 0, 0, 0)',
      selectable: false,
      stroke: 'rgba(0,255,0,1)',
      strokeWidth: 1,
      evented: false,
      left: 0,
      top: 0
    };
    var outFrame = new fjs.Rect(frame ? Object.assign(defaultConfig, frame) : defaultConfig);

    canvas.add(outFrame);
    this.props.setFrame(outFrame);
  }

  initFabric() {
    const fjs = fabric.fabric;
    const canvas = this.canvasObj = new fjs.Canvas('canvas');
  }

  render() {
    const {config} = this.state;
    return (<div className="image">
      <h1>{config.title}</h1>
      <div className="wrapper">
        <div className="image-canvas-container">
          <canvas id="canvas" width="300" height="300"></canvas>
            {process.env.WEBPACK && <ControlContainer config={config} fabric={fabric.fabric} canvas={this.canvasObj}/>}
        </div>
        {process.env.WEBPACK && <RotatePreview config={config} makeCanvas={this.makeCanvas.bind(this)} canvas={this.canvasObj}/>}
      </div>

    </div>);
  }
}
