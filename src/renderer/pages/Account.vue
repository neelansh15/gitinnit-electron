<template>
  <div class="mx-5 mt-5">
    <div class="d-flex align-center">
      <v-avatar size="70">
        <v-img :src="user.avatar_url" class="flex-grow-0" />
      </v-avatar>
      <div class="mt-4 ml-4">
        <h3>{{ user.name }}</h3>
        <p class="text-caption">@{{ user.login }}</p>
      </div>
    </div>

    <div class="mt-5">
      <v-btn depressed small @click="fetchRepos">Fetch repos</v-btn>
      <v-btn depressed small @click="logout">Log out</v-btn>

      <v-slide-y-transition>
      <v-card width="400" class="mt-5" v-if="newLogin" flat outlined>
        <v-card-title>First time setup</v-card-title>
        <v-card-subtitle
          >We need to configure your local git information for the app to work
          properly</v-card-subtitle
        >
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Github Full Name"
              v-model="newLoginFullname"
              :rules="rules.fullname"
              color="teal"
              outlined
              required
            />
            <v-text-field
              label="Github account Email"
              v-model="newLoginEmail"
              :rules="rules.email"
              color="teal"
              outlined
              required
            />
            <v-btn
              color="teal lighten-2"
              @click="setLocalGitCredentials"
              depressed
              small
              >Go</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
      </v-slide-y-transition>

      

      <Combobox />
    </div>

    <div v-if="repos.length > 0">
      <v-list>
        <v-list-item v-for="repo in repos" :key="repo.id">
          <v-list-item-content>
            {{ repo.full_name }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Combobox from "@/components/Combo.vue";

import { getData, setData } from "../utils";

export default {
  components: {
    Combobox,
  },

  data: () => ({
    access_token: "",
    user: {},
    repos: [],
    newLogin: false,
    newLoginFullname: "",
    newLoginEmail: "",
    rules: {
      fullname: [
        (v) => !!v || "Please provide the full name from your Github account",
      ],
      email: [
        (v) =>
          !!v || "Please provide the email you used for your Github account",
        (v) => /.+@.+\..+/.test(v) || "Please provide a valid email address",
      ],
    },
  }),
  created() {
    // check if logged in.
    this.access_token = this.$store.state.access_token;
    if (this.access_token == "" || this.access_token == null) {
      // If not logged in redirect to /login
      this.$router.push("/login");
    } else {
      // fetch user info
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
          this.newLoginFullname = res.data.name;

          // Update global config with any possible new data
          // const appDataGlobalConfigPath =
          //   app.getPath('appData') + '\\' + pkg.name + '\\globalConfig.json'
          // console.log(appDataGlobalConfigPath)

          // // Get the already existing globalConfig.json and update user data to it
          // const globalConfigData = JSON.parse(
          //   fs.readFileSync(appDataGlobalConfigPath)
          // )
          const globalConfigData = getData();
          globalConfigData.user = res.data;
          setData(globalConfigData);
        });
    }
  },
  mounted() {
    this.updateNewLoginValue();
  },
  methods: {
    updateNewLoginValue() {
      //Show git local user config options if newLogin
      this.newLogin = getData().newLogin;
    },
    setLocalGitCredentials() {
      if (this.$refs.form.validate()) {
        const { config } = require("../gitWrapper");
        config(this.newLoginFullname, this.newLoginEmail);

        const globalConfig = getData();
        globalConfig.newLogin = false;
        setData(globalConfig);

        this.updateNewLoginValue();
      }
    },
    fetchRepos() {
      axios
        .get(
          `https://api.github.com/user/repos?per_page=100&affiliation=owner`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + this.access_token,
            },
          }
        )
        .then((res) => {
          this.repos = res.data;
          console.log(res.data);
        });
    },
    logout() {
      // Not the best solution. Should revoke token from Github too
      this.$store.commit("setAccessToken", "");
      // also set empty in global config
      const globalConfigData = getData();
      globalConfigData.access_token = "";
      globalConfigData.user = {};
      setData(globalConfigData);

      this.$router.push("/"); // MAYBE put /login after testing
    },
  },
};
</script>

<style></style>
