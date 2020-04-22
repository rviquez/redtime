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
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="accent"
            class="mr-4"
            @click="submit"
            :disabled="!form.valid"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import firebase from "firebase";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        valid: true,
        email: "",
        password: ""
      },
      emailRules: [v => !!v || "E-mail is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            if (data) {
              this.$router.replace({ name: "Calendar" });
            }
          })
          .catch(err => {
            this.error = `Something went wrong: ${err.code}: ${err.message}`;
            this.setSnack(this.error);
          });
      }
    },
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    })
  }
};
</script>
