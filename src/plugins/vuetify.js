import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#e57373",
        secondary: "#ffa4a2",
        accent: "#af4448"
      }
    }
  }
});
