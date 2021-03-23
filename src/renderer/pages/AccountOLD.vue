<template>
  <div class="mx-5 mt-5">
    <div class="d-flex align-center">
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
    <v-btn @click="newWindow">New Window (Testing)</v-btn>
    <v-btn @click="login">Login</v-btn>
  </div>
</template>

<script>
import electronOauth2 from 'electron-oauth2'
import { config } from '../oauth-config'

//Note: Use a global config somewhere in AppData to store the tokens in it,
//and not use the local project-specific config

// const GitHubConfigOLD = {
//   client_id: config.clientId,
//   client_secret: config.clientSecret,
//   scope: 'read:user',
//   redirect_uri: '/account',
//   authorize_url: 'https://github.com/login/oauth/authorize',
//   access_token_url: 'https://github.com/login/oauth/access_token'
// }

const GitHubConfig = {
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  useBasicAuthorizationHeader: false,
  redirectUri: 'http://localhost'
}

const options = {
  scope: 'repo'
  // accessType: "",
}

const windowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }
}

export default {
  methods: {
    newWindow () {
      // Test creating a new window
      const electron = require('electron')
      const BrowserWindow = electron.BrowserView || electron.remote.BrowserWindow
      const mywindow = new BrowserWindow()
      mywindow.loadURL('http://google.com')
      mywindow.show()
    },
    login () {
      console.log('Login test')
      const myApiOauth = electronOauth2(GitHubConfig, windowParams)

      myApiOauth
        .getAccessToken(options)
        .then(token => {
          // use your token.access_token
          console.log('Token: ')
          console.log(token)
          myApiOauth
            .refreshToken(token.refresh_token)
            .then(newToken => {
              // use your new token
              console.log('Refresh Token (Important): ')
              console.log(newToken)
            })
            .catch(e => {
              console.log('Error while fetching REFRESH_TOKEN: ')
              console.log(e)
            })
        })
        .catch(e => {
          console.log('Error while fetching TOKEN: ')
          console.log(e)
        })
    }
  }
}
</script>

<style>
</style>
