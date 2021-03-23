<template>
  <div class="mx-5 mt-5">
    <div>
      <v-card class="pa-5">
        <h1 class="text-h5">Request code and enter it in the Auth page</h1>
        <v-btn depressed @click="login">Request code</v-btn>
        <v-btn
          class="red lighten-1"
          :disabled="
            this.auth.verification_uri == '' ||
              this.auth.verification_uri == null
          "
          depressed
          @click="openURL"
        >
          Go to Auth page
        </v-btn>
      </v-card>

      <v-alert
        class="mt-5"
        color="red lighten-2"
        v-if="error != '' && error != null"
        v-model="showError"
        dismissible
      >
        {{ error }}
      </v-alert>

      <h1 v-if="auth.user_code" class="text-h1 text-center mt-5">
        {{ auth.user_code }}
      </h1>

      <v-footer class="blue lighten-1" v-if="auth.user_code" app
        >Once you have entered the code in the browser's auth page,
        <v-btn @click="verifyLogin" class="blue lighten-1" depressed
          >Go forward</v-btn
        >
        {{ final_token_obj.access_token }}
      </v-footer>
    </div>
  </div>
</template>

<script>
const { remote } = require("electron");
const { app } = remote;
const qs = require("querystring");
const fs = require("fs");

import { shell } from "electron";
import axios from "axios";
import { config } from "../oauth-config";
import pkg from "../../../package.json";

export default {
  data: () => ({
    step1: true,
    showError: false,
    error: "",
    auth: {},
    final_token_obj: {} // Store in Vuex store though
  }),
  methods: {
    login() {
      // Request verification_url, device_code and user_code
      const scope = "repo%20read:user";
      axios
        .post(
          `https://github.com/login/device/code?client_id=${config.clientId}&scope=${scope}`
        )
        .then(res => {
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
        .then(res => {
          const authResponse = qs.parse(res.data);
          if (authResponse?.error) {
            this.error = authResponse.error_description;
            this.showError = true;
          } else {
            this.final_token_obj = authResponse;
            console.log(authResponse);

            //Set access token in the state
            this.$store.commit("setAccessToken", authResponse.access_token);

            //Set user data in a global config
            const appDataPath = app.getPath("appData") + "\\" + pkg.name;
            const appDataGlobalConfigPath = appDataPath + "\\globalConfig.js";
            console.log(appDataGlobalConfigPath);

            if (!fs.existsSync(appDataPath)) {
              fs.mkdirSync(appDataPath);
            }
            if (!fs.existsSync(appDataGlobalConfigPath)) {
              fs.openSync(appDataGlobalConfigPath, "w+");
            }

            fs.writeFileSync(
              appDataGlobalConfigPath,
              JSON.stringify({
                access_token: authResponse.access_token
              }),
              {
                flag: "w"
              }
            );

            this.$router.push("/account");
          }
        });
    }
  }
};
</script>

<style></style>
