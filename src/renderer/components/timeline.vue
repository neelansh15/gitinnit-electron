<template>
  <div>
    <v-btn class="ml-5" depressed @click="log">{{ buttonText }}</v-btn>
    <v-banner class="text-center" />
    <v-timeline>
      <v-item v-for="launch in launches" :key="launch.code">
        <v-timeline-item large>
          <template v-slot:opposite>
            <span>{{ launch.authorDate }}</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">
              Subject: {{ launch.subject }}
            </v-card-title>
            <v-card-subtitle>code : {{ launch.hash }}</v-card-subtitle>
            <v-card-text class="text-end">
              - {{ launch.authorName }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      launches: [],
      buttonText: 'Load Timeline'
    }
  },
  computed: {
    items () {
      return this.launches
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
    }
  }
}
</script>

<style></style>
