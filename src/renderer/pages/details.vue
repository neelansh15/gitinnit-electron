<template>
  <div>
    <h1>details</h1>
    <v-btn @click="push()">Push Files</v-btn>
  </div>
</template>

<script>

const fs = require('fs')
const git = require('../gitWrapper')

export default {
  data () {
    return {
      directoryPath: 'C:\\Users\\vedant\\Desktop\\testFolder'
    }
  },
  methods: {
    push () {
      console.log(this.directoryPath)
      const tfiles = []
      fs.readdir(this.directoryPath, function (err, files) {
        console.log('read')
        if (err) {
          return console.log('Unable to scan directory: ' + err)
        }
        files.forEach(file => {
          console.log('adding to array')
          tfiles.push(file)
        })
        console.log(tfiles)
        git.init
          .then(
            function (args) {
              console.log('init')
              git.remote
                .then(
                  function (args) {
                    console.log('remote')
                    git.addFiles(tfiles)
                  }
                )
            }
          )
          .then(
            function (args) {
              console.log('commit')
              git.commit('added file')
            }
          )
        git.pull()
        console.log('git pull')
        git.push()
      }
      )
    }
  }
}
</script>
