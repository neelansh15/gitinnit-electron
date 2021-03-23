<template>
  <div class="mx-5 mt-5">
    <div>
      <v-card class="pa-5">
        <h1 class="text-h5">Request code and enter it in the Auth page</h1>
        <v-btn @click="login" depressed>Request code</v-btn>
        <v-btn
          @click="openURL"
          class="red lighten-1"
          :disabled="
            this.auth.verification_uri == '' ||
            this.auth.verification_uri == null
          "
          depressed
          >Go to Auth page</v-btn
        >
      </v-card>

      <v-alert class="mt-5" color="red lighten-2" v-if="error != '' && error != null" v-model="showError" dismissible>
        {{ error }}
      </v-alert>

      <h1 v-if="auth.user_code" class="text-h1 text-center mt-5">
        {{ auth.user_code }}
      </h1>

      <v-footer class="blue lighten-1" v-if="auth.user_code" app
        >Click here after entering the code in the browser's auth page:
        <v-btn @click="verifyLogin" class="blue lighten-1" depressed
          >Go forward</v-btn
        >
        {{ final_token_obj.access_token }}
      </v-footer>
    </div>
  </div>
</template>

<script>
import { shell } from "electron";
import axios from "axios";
import { config } from "../oauth-config";
const qs = require("querystring");

export default {
  data: () => ({
    step1: true,
    showError: false,
    error: '',
    auth: {},
    final_token_obj: {}, //Store in Vuex store though
  }),
  methods: {
    login() {
      //Request verification_url, device_code and user_code
      const scope = "repo%20read:user";
      axios
        .post(
          `https://github.com/login/device/code?client_id=${config.clientId}&scope=${scope}`
        )
        .then((res) => {
          this.auth = qs.parse(res.data);
          console.log(this.auth);
        });
    },
    openURL() {
      shell.openExternal(this.auth.verification_uri);
    },
    verifyLogin() {
      axios
        .post(
          `https://github.com/login/oauth/access_token?client_id=${config.clientId}&device_code=${this.auth.device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code`
        )
        .then((res) => {
          const authResponse = qs.parse(res.data);
          if (authResponse?.error) {
            this.error = authResponse.error_description;
            this.showError = true
          } else {
            this.final_token_obj = authResponse;
            console.log(authResponse);

            this.$store.commit('setAccessToken', authResponse.access_token)
            this.$router.push('/account')
          }
        });
    },
  },
};
</script>

<style>
</style>