<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text>{{
          user.loggedIn ? profileText : loginText
        }}</v-btn>
      </template>

      <v-card v-if="user.loggedIn">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.data.displayName }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.data.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-btn text @click.prevent="signOut">Sign out</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-if="!user.loggedIn">
        <v-list>
          <v-list-item>
            <Login />
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
  <!-- <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">Vue Firebase Auth</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div class="nav-item">{{ user.data.displayName }}</div>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav> -->
</template>
<script>
import Login from "./Login";
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  components: {
    Login
  },
  data() {
    return {
      menu: false,
      loginText: "Login",
      profileText: "Profile"
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    }
  }
};
</script>
