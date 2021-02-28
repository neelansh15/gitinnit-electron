<template>
  <div>
    <h1>Account</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { config } from "../assets/oauth-config";

const GitHubConfig = {
  client_id: config.clientId,
  client_secret: config.clientSecret,
  scope: "read:user",
  redirect_uri: "/account",
  authorize_url: "https://github.com/login/oauth/authorize",
  access_token_url: "https://github.com/login/oauth/access_token",
};

export default {
  methods: {
    login() {
      console.log("Login test");
    },
  },
};
</script>

<style>
</style>
