import React, { Component } from 'react';
import {setColor} from '../../actions/image';
import { SketchPicker } from 'react-color';
if (process.env.WEBPACK) require('./css/ColorPicker.scss');
import { connect } from 'react-redux';
import Button from '../components/button';
import ClickOutside from 'react-click-outside';

@connect((state) => {
  const {image} = state;
  return {image};
}, {setColor})
export default class ColorPicker extends Component {
  state = {
    color: '#fff'
  };

  handleChangeColor = (color) => {
    this.props.setColor(color.hex);
  };

  hide = () => this.setState({colorPickerOpened: false});

  render() {
    const colorStyle = {background: this.props.image.color};
    return (<div className="color-picker">
      <span>Color: </span>
      <div className="text-color" style={colorStyle} onClick={() => {!this.state.colorPickerOpened && this.setState({colorPickerOpened: true})}}>
        {this.state.colorPickerOpened && <ClickOutside onClickOutside={::this.hide}> <div className="text-color-picker">
          <SketchPicker color={ this.state.color } onChangeComplete={ this.handleChangeColor }/>
          <Button type="square" onClick={this.hide}>done</Button>
        </div> </ClickOutside>}
      </div>
    </div>);
  }
}
