<template>
  <div>
    <v-row justify="center">
      <v-col md="8">
        <v-card class="pa-5 mt-10">
          <h1 class="mb-3 text-h5">
            Request code and enter it in the Auth page
          </h1>
          <v-btn depressed title="Request code to use in the next step: Authentication" @click="login">Request code</v-btn>

          <v-icon> mdi-arrow-right </v-icon>

          <v-btn
            class="red lighten-1"
            :disabled="
              this.auth.verification_uri == '' ||
                this.auth.verification_uri == null
            "
            depressed
            title="This will open a new tab in your default browser"
            @click="openURL"
          >
            Authenticate
          </v-btn>

          <v-icon> mdi-arrow-right </v-icon>

          <v-btn
            :disabled="!auth.user_code || !clicked"
            class="light-blue darken-1"
            depressed
            title="Click after authentication through the browser"
            @click="verifyLogin"
          >
            Confirm and Login
          </v-btn>
        </v-card>

        <v-alert
          v-if="error != '' && error != null"
          v-model="showError"
          class="mt-5"
          color="red lighten-2"
          dismissible
        >
          {{ error }}
        </v-alert>
      </v-col>
      <v-col cols="12">
        <h1 v-if="auth.user_code" class="text-h1 text-center mt-5">
          {{ auth.user_code }}
        </h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { shell } from 'electron'
import axios from 'axios'
import { config } from '../oauth-config'
import pkg from '../../../package.json'

const { remote } = require('electron')
const { app } = remote
const qs = require('querystring')
const fs = require('fs')

export default {
  data: () => ({
    clicked: false,
    showError: false,
    error: '',
    auth: {},
    final_token_obj: {} // Store in Vuex store though
  }),
  methods: {
    login () {
      // Request verification_url, device_code and user_code
      const scope = 'repo%20read:user'
      axios
        .post(
          `https://github.com/login/device/code?client_id=${config.clientId}&scope=${scope}`
        )
        .then(res => {
          this.auth = qs.parse(res.data)
          console.log(this.auth)
        })
    },
    openURL () {
      shell.openExternal(this.auth.verification_uri)
      this.clicked = true
    },
    verifyLogin () {
      axios
        .post(
          `https://github.com/login/oauth/access_token?client_id=${config.clientId}&device_code=${this.auth.device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code`
        )
        .then(res => {
          const authResponse = qs.parse(res.data)
          if (authResponse?.error) {
            this.error = authResponse.error_description
            this.showError = true
          } else {
            this.final_token_obj = authResponse
            console.log(authResponse)

            // Set access token in the state
            this.$store.commit('setAccessToken', authResponse.access_token)

            // Set user data in a global config
            const appDataPath = app.getPath('appData') + '\\' + pkg.name
            const appDataGlobalConfigPath = appDataPath + '\\globalConfig.json'
            console.log(appDataGlobalConfigPath)

            if (!fs.existsSync(appDataPath)) {
              fs.mkdirSync(appDataPath)
            }

            let globalConfigData
            if (!fs.existsSync(appDataGlobalConfigPath)) {
              fs.openSync(appDataGlobalConfigPath, 'w+')
              globalConfigData = {}
            } else {
              // Previous globalConfig exists
              globalConfigData = JSON.parse(
                fs.readFileSync(appDataGlobalConfigPath)
              )
            }
            // If there is already a globalConfig.json from a previous login, just update that
            globalConfigData.access_token = authResponse.access_token

            fs.writeFileSync(
              appDataGlobalConfigPath,
              JSON.stringify(globalConfigData),
              {
                flag: 'w'
              }
            )

            this.$router.push('/account')
          }
        })
    }
  }
}
</script>

<style></style>
