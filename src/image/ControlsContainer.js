import React, { Component } from 'react';
import * as Controls from './Controls';

export default class ControlsContainer extends Component {
  defaultProps = {
    config: {
      controls: []
    }
  };

  render() {
    const {config, fabric, canvas} = this.props;
    if (!config || !config.controls) {
      return <div>Loadig...</div>;
    }
    const controls = config.controls.map((component, index) => {
      const Component = Controls[component];
      return <div className="control" key={index}><Component fabric={fabric} canvas={canvas} /></div>;
    });
    return (<div className="controlsContainer">
      {controls.map((item) => item)}
    </div>);
  }
}
