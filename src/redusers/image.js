import {SET_COLOR, SET_CONFIG} from '../actions/image';

const initialState = {
  color: '#fff',
  config: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      state.color = action.color;
      return state;
    case SET_CONFIG:
      state.config = action.config;
      return state;
    default:
      return state;
  }
};
