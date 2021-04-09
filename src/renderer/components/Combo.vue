<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="repos"
          label="Select Repository"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
            access_token: "",
            repos: [],
        }
    },
    methods: {
    async fetchRepos() {
      axios
        .get(`https://api.github.com/user/repos`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "token " + this.access_token
          }
        })
        .then(res => {
          this.repos = res.data;
          console.log(res.data);
        });
    },
  }
  }
</script>