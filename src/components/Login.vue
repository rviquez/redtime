<template>
  <v-form ref="form" lazy-validation @submit.prevent="submit">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="E-mail"
            required
            type="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.password"
            type="password"
            name="password"
            label="Password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="accent" class="mr-4" @click="submit">
            Login
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          New user?
          <router-link to="register" class="nav-link">Register</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          if (data) {
            this.$router.replace({ name: "Dashboard" });
          }
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
