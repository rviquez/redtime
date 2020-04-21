const snackbar = {
  namespaced: true,
  state: {
    snack: ""
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    }
  }
};

export default snackbar;
