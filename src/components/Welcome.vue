<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../../public/img/icons/android-chrome-512x512.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Red Time
        </h1>

        <p class="subheading font-weight-regular">
          Your simple online cycle tracker
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Welcome",

  data: () => ({}),
  mounted() {
    if (this.user) {
      this.$router.replace({
        name: "Calendar"
      });
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
};
</script>
