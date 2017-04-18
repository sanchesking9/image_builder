export const SET_COLOR = 'SET_COLOR';
export const SET_CONFIG = 'SET_CONFIG';

export const setColor = (color) => {
  return {
    type: SET_COLOR,
    color
  }
};

export const setConfig = (config) => {
  return {
    type: SET_CONFIG,
    config
  }
};
