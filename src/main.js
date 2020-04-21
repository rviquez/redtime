import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBSNgyM0gvNE_VuprrlaDbVIEtkqp-HW6M",
  authDomain: "redtime-d7beb.firebaseapp.com",
  databaseURL: "https://redtime-d7beb.firebaseio.com",
  projectId: "redtime-d7beb",
  storageBucket: "redtime-d7beb.appspot.com",
  messagingSenderId: "745948322914",
  appId: "1:745948322914:web:3ceb17d4ebaa98a876453b",
  measurementId: "G-DENHGGD0G2"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
