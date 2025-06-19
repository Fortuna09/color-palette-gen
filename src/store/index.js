import { createStore } from 'vuex'; 


export default createStore({ 
  state: {
    currentPalette: [],
    savedPalettes: [],
  },
  mutations: {
    setPalette(state, newPalette) {
      state.currentPalette = newPalette;
    },
    addSavedPalette(state, palette) {
      state.savedPalettes.push(palette);
    },
  },
  actions: {
    saveCurrentPalette({ commit, state }) {
      if (state.currentPalette.length > 0) {
        commit('addSavedPalette', [...state.currentPalette]);
      }
    },
  },
  modules: {},
});