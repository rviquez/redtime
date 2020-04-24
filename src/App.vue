<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/" class="nav-link">
          <v-img
            alt="Red Time Logo"
            class="shrink mr-2"
            contain
            src="../public/img/icons/android-chrome-192x192.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <navbar></navbar>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md10>
            <!-- <Welcome /> -->
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <Snackbar></Snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Welcome from "./components/Welcome";
import Navbar from "./components/NavBar";
import Snackbar from "./components/Snackbar.vue";

export default {
  name: "App",

  components: {
    Navbar,
    Snackbar
  }
};
</script>
