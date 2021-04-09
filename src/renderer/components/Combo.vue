<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6" >
        
        <v-select offset-y
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
import axios from "axios"
import {getData,setData} from "../utils"
export default {
  data() {
    return {
      repos: [],
      selected: " "
    };
  },

  mounted() {
    let config= getData()
    this.selected=config.current_project.githubPath
    this.fetchRepos();

  },
  watch:{
    "selected":"update_value"
  },
  methods: {
    update_value(){
    console.log(this.selected)
    let config= getData()
    config.current_project.githubPath=this.selected
    setData(config)
    // Also updata projects array -todo 

    },
    fetchRepos() {
      let access_token = this.$store.state.access_token;
      axios
        .get(`https://api.github.com/user/repos`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "token " + access_token,
          },
        })
        .then((res) => {
          this.repos = res.data;
          console.log(res.data);
        });
    },
  },
};
</script>