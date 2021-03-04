<template>
  <div>
    <h1>Account</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { config } from "../oauth-config";
import electronOauth2 from "electron-oauth2";

// const GitHubConfig = {
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
  authorizationUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  useBasicAuthorizationHeader: false,
  redirectUri: "http://localhost",
};

const options = {
  scope: "repo",
  accessType: "",
};

const windowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false,
  },
};

export default {
  methods: {
    login() {

      console.log("Login test");
      const myApiOauth = electronOauth2(GitHubConfig, windowParams);

      myApiOauth.getAccessToken(options).then((token) => {
        // use your token.access_token
        console.log("Token: " + token);
        myApiOauth.refreshToken(token.refresh_token).then((newToken) => {
          //use your new token
          console.log("Refresh Token (Important): " + newToken);
        });
      });

    },
  },
};
</script>

<style>
</style>
