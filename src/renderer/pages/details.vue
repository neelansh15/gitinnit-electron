<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <!-- xs12 and sm12 to make it responsive = 12 columns on mobile and 6 columns from medium to XL layouts -->
        <v-flex xs12 sm12>
          <h1>Details</h1>
          <v-row align="center" justify="center">
            <v-col>
              <h2>Project Name: {{ projectName }}</h2>
            </v-col>
            <v-col>
              <h2>Author Name: {{ author }}</h2>
            </v-col>
          </v-row>

          <v-row align="center" justify="space-around">
            <v-col>
              <!-- <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on">
                    Push Files
                  </v-btn>
                </template>

                <v-card max-width="475" class="mx-auto">
                  <v-card-title>Select files to push to repo</v-card-title>
                  <v-list subheader two-line flat>
                    <v-list-item-group multiple>
                      <pushComponent
                        v-for="(file, index) in files.length"
                        :key="file.name"
                        :index="index"
                        :names-array="files.map(a => a.name)"
                      />
                    </v-list-item-group>
                  </v-list>
                  <v-spacer />
                  <v-card-actions>
                    <v-btn @click="dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
              <v-btn @click="push">Push files</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="pull">Pull Files</v-btn>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>

    <br />
    <timeline />
  </div>
</template>

<script>
import pushComponent from "@/components/push.vue";
import timeline from "@/components/timeline.vue";
const globalConfig = require("../utils/index");

const fs = require("fs");

export default {
  components: {
    timeline,
    pushComponent
  },
  data() {
    return {
      project: {},
      directoryPath: "",
      githubPath: "",
      projectName: "",
      author: "",
      files: [],
      dialog: false
    };
  },
  mounted() {
    // note cant change path here needs to be passed as string
    this.project = globalConfig.getData().current_project;
    this.directoryPath = this.project.path;
    this.githubPath = this.project.githubPath;
    this.projectName = this.project.name;
    this.author = this.project.author;
    console.log(this.project);
    console.log(this.directoryPath);
    // this.importAll(
    //   require.context("C:\\Users\\vedant\\Desktop\\testFolder", true, /\.txt$/)
    // );
  },
  methods: {
    // importAll(r) {
    //   r.keys().forEach(key => {
    //     this.files.push({ name: key.slice(2) });
    //   });
    //   console.log(this.files);
    // },
    check() {
      console.log(this.directoryPath);
    },
    push() {
      const git = require("../gitWrapper");
      console.log(this.directoryPath);
      git.setPath();
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
    async log() {
      const git = require("../gitWrapper");
      let temp;
      const launches = await git.log().then(value => {
        temp = value;
      });
      console.log(temp);
    },
    pull() {
      const git = require("../gitWrapper");
      git.setPath(this.directoryPath, this.githubPath);
      git.pull();
    }
  }
};
</script>
