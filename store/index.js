export const strict = false;

const initialState = {
  predictLabel: ''
};

export const state = () => Object.assign({}, initialState);

export const mutations ={
  setPredictLabel (state, predictLabel) {
    state.predictLabel = predictLabel
  },
  clear(state) {
    for (let key in state) {
      if (initialState.hasOwnProperty(key)) {
        state[key] = initialState[key];
      }
    }
  }
};