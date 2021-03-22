<template>
  <div>
    <h1>Details</h1>
    <h2>Project Name: {{ projectName }}</h2>
    <h2>Author Name: {{ author }}</h2>
    <v-btn @click="check">Check path</v-btn>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Push Files
        </v-btn>
      </template>

      <v-card max-width="475" class="mx-auto">
        <v-list subheader two-line flat>
          <v-list-item-group multiple>
            <push
              v-for="(file, index) in files.length"
              :key="file.name"
              :index="index"
              :names-array="files.map(a => a.name)"
            />
          </v-list-item-group>
        </v-list>
        <v-spacer></v-spacer>
        <v-btn @click="push">Push files</v-btn>
        <v-card-actions>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <pull />
    <v-btn @click="log()">Log</v-btn>
    <br />
    <h1>Timeline</h1>
    <timeline></timeline>
  </div>
</template>

<script>
import pull from "@/components/pull.vue";
import push from "@/components/push.vue";
import timeline from "@/components/timeline.vue";
import projects from "@/projects.json";

const fs = require("fs");

export default {
  data() {
    return {
      directoryPath: projects.path,
      githubPath: projects.githubPath,
      projectName: projects.name,
      author: projects.author,
      files: [],
      dialog: false
    };
  },
  components: {
    pull,
    timeline,
    push
  },
  mounted() {
    // note cant change path here needs to be passed as string
    this.importAll(
      require.context("C:\\Users\\vedant\\Desktop\\testFolder", true, /\.txt$/)
    );
  },
  methods: {
    importAll(r) {
      r.keys().forEach(key => {
        this.files.push({ name: key.slice(2) });
      });
      console.log(this.files);
    },
    check() {
      console.log(this.directoryPath);
    },
    push() {
      const git = require("../gitWrapper");
      console.log(this.directoryPath);
      git.setPath(this.directoryPath, this.githubPath);
      const tfiles = [];
      fs.readdir(this.directoryPath, function(err, files) {
        console.log("read");
        if (err) {
          return console.log("Unable to scan directory: " + err);
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
    log() {
      const git = require("../gitWrapper");
      git.log();
      console.log(git.log());
    }
  }
};
</script>
