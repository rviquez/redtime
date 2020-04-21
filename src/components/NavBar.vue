<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="closeOnClick"
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
              <v-btn text @click="signOut">Sign out</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-if="!user.loggedIn">
        <v-list>
          <v-list-item>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <Login />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  New user?
                  <a to="register" @click="goToRegister" class="nav-link"
                    >Register</a
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
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
      profileText: "Profile",
      closeOnClick: true
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
    },
    goToRegister() {
      this.$router.replace({ name: "Register" });
    }
  }
};
</script>
