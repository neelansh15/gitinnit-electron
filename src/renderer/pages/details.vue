<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <!-- xs12 and sm12 to make it responsive = 12 columns on mobile and 6 columns from medium to XL layouts -->
        <v-flex xs12 sm12>
          <v-row align="center" justify="center">
            <v-col>
              <v-card color="teal darken-3">
                <v-card-text class="white--text">
                  <div class="overline teal--text text--lighten-3">
                    {{ project.genre }}
                  </div>
                  <div class="text-h5 teal--text text--lighten-5">
                    {{ project.name }}
                  </div>
                  <div class="teal--text text--lighten-3">
                    By {{ project.author }}
                  </div>
                  <div class="mt-2 teal--text text--lighten-2">
                    <v-chip
                      class="teal lighten-2 teal--text text--darken-3 font-weight-bold"
                      x-small
                      >Local</v-chip
                    >
                    {{ project.path }} <br />
                    <v-chip
                      class="teal lighten-2 teal--text text--darken-3 font-weight-bold"
                      x-small
                      >Remote</v-chip
                    >
                    {{ project.githubPath }}
                  </div>
                </v-card-text>
                <div class="pa-2 teal lighten-2 font-weight-medium">
                  <v-btn
                    color="teal lighten-2 teal--text text--darken-4"
                    depressed
                    @click.stop="dialog = true"
                    >Push</v-btn
                  >
                  <v-btn
                    color="teal lighten-2 teal--text text--darken-4"
                    depressed
                    @click="pull"
                  >
                    Pull
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-dialog v-model="dialog" max-width="320">
            <v-card>
              <v-card-title class="headline">
                Commit Message
              </v-card-title>

              <v-card-text>
                <v-text-field
                  label="Message"
                  v-model="commitMessage"
                  counter="50"
                  filled
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="push">
                  Push
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
          <collaborators />
        </v-flex>
      </v-layout>
    </v-container>

    <br />
    <timeline />
    <v-btn @click="test">Click</v-btn>
  </div>
</template>

<script>
import pushComponent from "@/components/push.vue";
import timeline from "@/components/timeline.vue";
import Collaborators from '../components/Collaborators.vue';
const globalConfig = require("../utils/index");

const fs = require("fs");

export default {
  components: {
    timeline,
    pushComponent,
    Collaborators
  },
  data() {
    return {
      project: {},
      commitMessage: "",
      files: [],
      dialog: false
    };
  },
  mounted() {
    // note cant change path here needs to be passed as string
    this.project = globalConfig.getData().current_project;
    console.log(this.project);
    console.log(this.project.path);
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
      console.log(this.project.path);
    },
    push() {
      this.dialog = false;
      const git = require("../gitWrapper");
      const message = this.commitMessage;
      console.log(this.commitMessage);
      console.log(message);
      git.setPath();
      const tfiles = [];
      fs.readdir(this.project.path, function(err, files) {
        console.log("read");
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        files.forEach(file => {
          console.log("adding to array");
          tfiles.push(file);
        });
        console.log(tfiles);

        console.log("commit");
        git.commit(tfiles, message);
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
      console.log("git pull");
      const git = require("../gitWrapper");
      git.setPath();
      git.pull();
    },
    test() {
      const git = require("../gitWrapper");
      git.checkout("74aa4a176a7fac05d74b4c861c440ecf371a0698");
    }
  }
};
</script>
