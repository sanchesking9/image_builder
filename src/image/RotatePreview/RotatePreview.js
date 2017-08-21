import React, { Component } from 'react';

export default class RotatePreview extends Component {
    state = {
        currentSide: 'front',
    }

    changeSide(e) {
        const {config, fabric, canvas} = this.props;
        const side = e.currentTarget.dataset.side;
        const imgUrl = config.sidesBackground.find(item => item.side === side).background;

        fabric.Image.fromURL(imgUrl, (oImg) => {
            oImg.setWidth(canvas.width);
            oImg.setHeight(canvas.height);
            canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0
            });

            this.setState({currentSide: side});
        });
    }

    render() {
        const {config} = this.props;
        return (
            <div className="rotate-preview">
                <ul>
                    {config.sidesBackground && config.sidesBackground.length && config.sidesBackground.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="title">{item.side}</div>
                                <img className={item.side === this.state.currentSide && 'selected'} data-side={item.side} onClick={this.changeSide.bind(this)} src={item.background} alt=""/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}
