<template>
  <div>
    <p>Current selected timeline/commit: {{ branch_name }}</p>
    <v-btn class="ml-10" depressed @click="log">{{ buttonText }}</v-btn>
    <v-btn depressed @click="checkout_commit('master')">Back to Master branch</v-btn>
    <v-banner class="text-center" />
    <v-timeline>
      <v-item v-for="launch in launches" :key="launch.code">
        <v-timeline-item large>
          <template v-slot:opposite>
            <span>{{ launch.authorDate }}</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title>
              {{ launch.subject }}
            </v-card-title>
            <v-card-subtitle>ID: {{ launch.hash }}</v-card-subtitle>
            <v-card-text>
              {{ launch.authorName }}
            </v-card-text>

            <v-card-actions v-if="branch_name != launch.hash">
              <v-btn color="primary" @click="checkout_commit(launch.hash)" text small>Go here</v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-item>
    </v-timeline>
  </div>
</template>

<script>
import { getData } from '../utils'

export default {
  data() {
    return {
      launches: [],
      buttonText: "Load Timeline",
      branch_name: ''
    };
  },
  computed: {
    items() {
      return this.launches;
    },
  },
  methods: {
    async log() {
      const git = require("../gitWrapper");
      await git.log().then(value => {
        this.launches = value;
        console.log(this.launches);
        this.buttonText = "Reload timeline";
      });
    },
    async checkout_commit(hash){
      const git = require('../gitWrapper')
      await git.checkout(hash)
      this.branch_name = getData().current_project.branch_name
    }
  },
  mounted(){
    this.branch_name = getData().current_project.branch_name
  }
};
</script>

<style></style>
