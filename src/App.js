import React, { Component } from 'react';
import { Image } from './image';
if (process.env.WEBPACK) require('./css/App.scss');
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redusers';

export default class App extends Component {
  render() {
    const store = createStore(reducers);
    
    return (
      <div>
        <Provider store={store}>
          <Image />
        </Provider>
      </div>
    );
  }
}
