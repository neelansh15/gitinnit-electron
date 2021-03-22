<template>
  <div>
    <h1>details</h1>
    <h2>Project Name:</h2>
    <h2>Author Name:</h2>
    <v-btn @click="push()">
      <push
        v-for="(file, index) in files.length"
        :key="file.name"
        :index="index"
        :names-array="files.map(a => a.name)"
      />
    </v-btn>
    <pull />
    <v-btn @click="log()">Log</v-btn>
    <br>
    <h1>Timeline</h1>
    <timeline></timeline>
  </div>
</template>

<script>
import pull from "@/components/pull.vue"
import push from "@/components/push.vue"
import timeline from "@/components/timeline.vue"

const fs = require('fs')


export default {
  data () {
    return {
      directoryPath: 'C:\\Users\\vedant\\Desktop\\testFolder',
      files: [
        {
          name: 'Frozen Yogurt',
          required: 1,
          vMode1: ''
        }
      ]
     
    }
  },
  components: {
    pull, timeline, push
  },
  methods: {
    push () {
      const git = require('../gitWrapper')
      console.log(this.directoryPath)
      const tfiles = []
      fs.readdir(this.directoryPath, function (err, files) {
        console.log('read')
        if (err) {
          return console.log('Unable to scan directory: ' + err)
        }
        files.forEach(file => {
          console.log("adding to array");
          tfiles.push(file);
        });
        console.log(tfiles);
        git.addFiles(tfiles);
        console.log("commit");
        git.commit("added file");
        git.pull();
        console.log("git pull");
        git.push();
      });
    },
    log () {
      const git = require('../gitWrapper')
      git.log()
      console.log(git.log())
    }
  }
}
</script>
