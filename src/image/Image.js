import React, { Component } from 'react';
if (process.env.WEBPACK) { var fabric = require('fabric');}
if (process.env.WEBPACK) require('./css/Image.scss');
import ControlContainer from './ControlsContainer';
import { connect } from 'react-redux';
import {setConfig, setFrame} from '../actions/image';

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
    var out_frame = new fjs.Rect({
      width: 160,
      height: 240,
      fill: 'rgba(0, 0, 0, 0)',
      selectable: false,
      stroke: 'rgba(0,255,0,1)',
      strokeWidth: 1,
      evented: false,
      left: 70,
      top: 40
    });

    canvas.add(out_frame);
    this.props.setFrame(out_frame);
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
