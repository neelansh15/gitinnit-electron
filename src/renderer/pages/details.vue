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
                    {{ project.path }} <br />
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

          <!-- <v-row align="center" justify="space-around">
            <v-col>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on"> Push Files finally</v-btn>
                </template>

                <v-card max-width="475" class="mx-auto">
                  <v-card-title>Select files to push to repo</v-card-title>
                  <v-list subheader two-line flat>
                    <v-list-item-group multiple>
                      <pushComponent
                        v-for="(file, index) in files.length"
                        :key="file.name"
                        :index="index"
                        :names-array="files.map((a) => a.name)"
                      />
                    </v-list-item-group>
                  </v-list>
                  <v-spacer />
                  <v-text-field
                    label="Commit message"
                    v-model="commitMessage"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn @click="push">Push files</v-btn>
                    <v-btn @click="dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col>
              <v-btn @click="pull">Pull Files</v-btn>
            </v-col>
          </v-row> -->
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
        git.addFiles(tfiles);
        console.log("commit");
        git.commit(message);
        git.pull();
        console.log("git pull");
        git.push();
        this.dialog = false;
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
    }
  }
};
</script>
