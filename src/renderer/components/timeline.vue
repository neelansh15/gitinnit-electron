<template>
  <div>
    <p>{{ output_file == null ? "NULL" : output_file }}</p>

    <p>Current selected timeline/commit: {{ branch_name }}</p>
    <v-btn class="ml-10" depressed @click="log">{{ buttonText }}</v-btn>
    <v-btn depressed @click="checkout_commit('master')">
      Back to Master branch
    </v-btn>
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

            <v-card-actions>
              <v-btn
                v-if="branch_name != launch.hash"
                color="primary"
                text
                small
                @click="checkout_commit(launch.hash)"
              >
                Go here
              </v-btn>
              <div v-else-if="branch_name == launch.hash && output_file">
                <v-btn text small title="Play output file">
                  Play
                  <v-icon> mdi-play </v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-item>
    </v-timeline>
  </div>
</template>

<script>
import { getData, getOutputFilePath } from '../utils'

export default {
  data () {
    return {
      launches: [],
      buttonText: 'Load Timeline',
      branch_name: '',
      output_file: null
    }
  },
  computed: {
    items () {
      return this.launches
    }
  },
  mounted () {
    this.branch_name = getData().current_project.branch_name
    const output_file_path = getOutputFilePath()
    console.log('OUTPUT FILE PATH: ', output_file_path)
    if (output_file_path) {
      this.output_file = output_file_path
    }
  },
  updated () {
    // Update the output file path
    const output_file_path = getOutputFilePath()
    console.log('OUTPUT FILE PATH: ', output_file_path)
    if (output_file_path) {
      this.output_file = output_file_path
    } else {
      this.output_file = null
    }
  },
  methods: {
    async log () {
      const git = require('../gitWrapper')
      await git.log().then(value => {
        this.launches = value
        console.log(this.launches)
        this.buttonText = 'Reload timeline'
      })
    },
    async checkout_commit (hash) {
      const git = require('../gitWrapper')
      await git.checkout(hash)
      this.branch_name = getData().current_project.branch_name
    }
  }
}
</script>

<style></style>
