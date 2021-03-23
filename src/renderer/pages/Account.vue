<template>
  <div>
    <h1>Account</h1>
    <div class="d-flex align-center ml-5">
      <v-avatar size="70">
        <v-img
          :src="user.avatar_url"
          class="flex-grow-0"
        />
      </v-avatar>
      <div class="mt-4 ml-4">
        <h3>{{ user.name }}</h3>
        <p class="text-caption">@{{ user.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    access_token: "",
    user: {},
  }),
  created() {
    //check if logged in.
    this.access_token = this.$store.state.access_token;
    if (this.access_token == "" || this.access_token == null) {
      //If not logged in redirect to /login
      this.$router.push("/login");
    } else {
      //fetch user info
      axios
        .get(`https://api.github.com/user`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "token " + this.access_token,
          },
        })
        .then((res) => {
          console.log(res);
          this.user = res.data;
        });
    }
  },
};
</script>

<style>
</style>