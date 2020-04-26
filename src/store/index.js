import Vue from "vue";
import Vuex from "vuex";
import Snackbar from "./snackbar";
import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    events: []
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setEvents: (state, events) => {
      state.events = events;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    setEvents: async context => {
      let snapshot = await db
        .collection("calEvent")
        .where("user", "==", context.getters.user.data.email)
        .get();
      const events = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      context.commit("setEvents", events);
    }
  },
  modules: {
    snackbar: Snackbar
  }
});
