<template>
  <div class="mx-5 mt-5">
    <div class="d-flex align-center" v-if="loggedIn">
      <v-img
        src="https://img.icons8.com/bubbles/100/000000/gender-neutral-user.png"
        width="100"
        height="100"
        class="flex-grow-0"
      />
      <div class="mt-4">
        <h3>Neelansh Mathur</h3>
        <p class="text-caption">@mneelansh15</p>
      </div>
    </div>
    <!-- <v-btn @click="newWindow">New Window (Testing)</v-btn> -->

    <div v-if="!loggedIn">
      <v-card class="pa-5">
        <h1 class="text-h5">Request code and enter it in the Auth page</h1>
        <v-btn @click="login" depressed>Request code</v-btn>
        <v-btn @click="openURL" :disabled="(this.auth.verification_uri == '' || this.auth.verification_uri == null)" depressed>Go to Auth page</v-btn>
      </v-card>
      <h1 v-if="auth.user_code" class="text-h1 text-center mt-5">{{ auth.user_code }}</h1>
    
      <v-footer class="red lighten-1" v-if="auth.user_code" app>Click here after entering the code in the browser's auth page: 
        <v-btn class="red lighten-1" depressed>Go forward</v-btn>
      </v-footer>
    </div>
  </div>
</template>

<script>
import { shell } from 'electron'
import axios from "axios";
import {config} from "../oauth-config"
const qs = require('querystring')

// const windowParams = {
//   alwaysOnTop: true,
//   autoHideMenuBar: true,
//   webPreferences: {
//     nodeIntegration: false,
//   },
// };

export default {
  data: () => ({
    loggedIn: false,
    step1: true,
    auth: {}
  }),
  methods: {
    // newWindow () {
    //   // Test creating a new window
    //   const electron = require('electron')
    //   const BrowserWindow = electron.BrowserView || electron.remote.BrowserWindow
    //   const mywindow = new BrowserWindow()
    //   mywindow.loadURL('https://github.com/login/oauth/authorize')
    //   mywindow.show()
    // },
    login() {
      //Request verification_url, device_code and user_code
      const scope = "repo%20read:user"
      axios.post(`https://github.com/login/device/code?client_id=${config.clientId}&scope=${scope}`).then((res) => {
        this.auth = qs.parse(res.data)
        console.log(this.auth)
      });

    },
    openURL(){
      shell.openExternal(this.auth.verification_uri)
    }
  },
};
</script>

<style>
</style>
