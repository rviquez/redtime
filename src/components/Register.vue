<template>
  <v-form
    ref="form"
    v-model="form.valid"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            :rules="nameRules"
            label="Name"
            required
            autofocus
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
            type="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            type="password"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.confirmpassword"
            :rules="[
              form.password === form.confirmpassword || 'Password must match'
            ]"
            type="password"
            name="confirmpassword"
            label="Comfirm Password"
            counter
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="accent" class="mr-4" @click="submit">
            Register
          </v-btn>
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
        valid: true,
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
      },
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Min 8 characters"
      ],
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          let name = this.form.name;
          data.user
            .updateProfile({
              displayName: name
            })
            .then(() => {});
          this.$router.replace({ name: "Welcome" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
