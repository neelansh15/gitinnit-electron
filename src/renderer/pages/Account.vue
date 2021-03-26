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
import axios from 'axios'

import { getData, setData } from '../utils'

export default {
  data: () => ({
    access_token: '',
    user: {},
    repos: []
  }),
  created () {
    // check if logged in.
    this.access_token = this.$store.state.access_token
    if (this.access_token == '' || this.access_token == null) {
      // If not logged in redirect to /login
      this.$router.push('/login')
    } else {
      // fetch user info
      axios
        .get(`https://api.github.com/user`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'token ' + this.access_token
          }
        })
        .then(res => {
          console.log(res)
          this.user = res.data

          // Update global config with any possible new data
          // const appDataGlobalConfigPath =
          //   app.getPath('appData') + '\\' + pkg.name + '\\globalConfig.json'
          // console.log(appDataGlobalConfigPath)

          // // Get the already existing globalConfig.json and update user data to it
          // const globalConfigData = JSON.parse(
          //   fs.readFileSync(appDataGlobalConfigPath)
          // )
          let globalConfigData = getData()
          globalConfigData.user = res.data
          setData(globalConfigData)
        })
    }
  },
  methods: {
    fetchRepos () {
      axios
        .get(`https://api.github.com/user/repos`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'token ' + this.access_token
          }
        })
        .then(res => {
          this.repos = res.data
          console.log(res.data)
        })
    },
    logout () {
      // Not the best solution. Should revoke token from Github too
      this.$store.commit('setAccessToken', '')
      // also set empty in global config
      let globalConfigData = getData()
      globalConfigData.access_token =  ''
      globalConfigData.user = {}
      setData(globalConfigData)

      this.$router.push('/') // MAYBE put /login after testing
    }
  }
}
</script>

<style></style>
