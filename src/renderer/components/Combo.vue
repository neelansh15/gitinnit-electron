<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          offset-y
          :items="repos"
          v-model="selected"
          label="Select Repo "
          item-text="name"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import { getData, setData } from "../utils";
export default {
  data() {
    return {
      repos: [],
      selected: " ",
    };
  },

  mounted() {
    this.fetchRepos();
  },
  watch: {
    selected: "update_value",
  },
  methods: {
    update_value() {
      let config = getData();

      let newGithubPath = 
        "https://github.com/" +
        config.user.login +
        "/" +
        this.selected +
        ".git";
      config.current_project.githubPath = newGithubPath

      // TODO: Also update projects array
      let projects = config.projects
      projects = projects.filter(item => item.id != config.current_project.id)
      projects.push(config.current_project)
      
      //Set projects array back
      config.projects = projects
      
      setData(config)
    },
    fetchRepos() {
      let access_token = this.$store.state.access_token;
      axios
        .get(
          `https://api.github.com/user/repos?per_page=100&affiliation=owner`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + access_token,
            },
          }
        )
        .then((res) => {
          this.repos = res.data;
          console.log(res.data);
        });
    },
  },
};
</script>