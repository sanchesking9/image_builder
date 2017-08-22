import React, { Component } from 'react';

export default class RotatePreview extends Component {
    state = {
        currentSide: 'front',
    }

    changeSide(e) {
        const {config, canvas, makeCanvas} = this.props;
        const {currentSide} = this.state;
        const side = e.currentTarget.dataset.side;
        const imgUrl = config.sidesBackground.find(item => item.side === side).background;

        if (side !== currentSide) {
            this.setState({
                [currentSide]: canvas.toJSON(),
                currentSide: side,
            });

            canvas.clear();

            if (this.state[side]) {
                canvas.loadFromJSON(this.state[side], canvas.renderAll.bind(canvas));
            } else {
                makeCanvas(imgUrl);
            }
        }
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
                                <img
                                    className={item.side === this.state.currentSide && 'selected'}
                                    data-side={item.side}
                                    onClick={this.changeSide.bind(this)}
                                    src={item.background} alt=""
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}
