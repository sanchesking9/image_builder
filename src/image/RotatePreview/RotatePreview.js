import React, { Component } from 'react';

export default class RotatePreview extends Component {
    state = {
        currentSide: 'front',
    }

    changeSide(e) {
        const {config, canvas, addFrame, addBackground} = this.props;
        const {currentSide} = this.state;
        const side = e.currentTarget.dataset.side;
        const imgUrl = config.sidesBackground.find(item => item.side === side).background;

        if (side !== currentSide) {
            this.setState({
                [currentSide]: [...canvas.getObjects()],
                currentSide: side,
            });

            canvas.clear();

            if (this.state[side] && this.state[side].length) {
                addBackground(imgUrl);
                for (let i = 0; i < this.state[side].length; i+=1) {
                    canvas.add(this.state[side][i])
                }
            } else {
                addBackground(imgUrl);
                addFrame()
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
