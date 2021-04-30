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
                    >
                      Local
                    </v-chip>
                    {{ project.path }} <br />
                    <v-chip
                      class="teal lighten-2 teal--text text--darken-3 font-weight-bold"
                      x-small
                    >
                      Remote
                    </v-chip>
                    {{ project.githubPath }} <br />
                    <v-chip
                      class="teal lighten-2 teal--text text--darken-3 font-weight-bold"
                      x-small
                    >
                      Audio Output
                    </v-chip>
                    {{ current_output_file }}
                  </div>
                </v-card-text>
                <div class="pa-2 teal lighten-2 font-weight-medium">
                  <v-btn
                    color="teal lighten-2 teal--text text--darken-4"
                    depressed
                    @click.stop="dialog = true"
                  >
                    Push
                  </v-btn>
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

          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title> Commit Message </v-card-title>
              <v-card-subtitle>
                Describe the modifications in short
              </v-card-subtitle>

              <v-card-text>
                <v-text-field
                  v-model="commitMessage"
                  label="Message"
                  counter="50"
                  outlined
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn color="red darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="teal darken-1"
                  text
                  :disabled="commitMessage.length > 50"
                  @click="push"
                >
                  Push
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <collaborators />
          <v-row class="mx-2 mt-5">
            <v-col cols="12" md="6">
              <v-file-input
                :label="`Project's default output audio file (Current: ${current_output_file})`"
                :title="`Current: ${current_output_file})`"
                accept="audio/*"
                @change="updateOutputFileInConfig"
                outlined
                dense
              ></v-file-input>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>

    <br />
    <combobranch />
    <timeline />
  </div>
</template>

<script>
import pushComponent from "@/components/push.vue";
import timeline from "@/components/timeline.vue";
import combobranch from "@/components/BranchCombo.vue";
import Collaborators from "../components/Collaborators.vue";
const fs = require("fs");
const { getData, setOutputFilePath } = require("../utils/index");

export default {
  components: {
    timeline,
    pushComponent,
    Collaborators,
    combobranch,
  },
  data() {
    return {
      project: {},
      commitMessage: "",
      files: [],
      dialog: false,
      current_output_file: getData().current_project.output_file
    };
  },
  mounted() {
    // note cant change path here needs to be passed as string
    this.project = getData().current_project;
    console.log(this.project);
    console.log(this.project.path);

    //Set outputfile

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
    updateOutputFileInConfig(file) {
      setOutputFilePath(file.path);
      this.$root.$emit("updateOutputFile") //Send event alert to Timeline.vue
      this.current_output_file = file.path
    },
    check() {
      console.log(this.project.path);
    },
    push() {
      this.dialog = false;
      const git = require("../gitWrapper");
      const message = this.commitMessage;
      this.commitMessage = "";
      console.log(message);
      git.setPath();
      const tfiles = [];
      fs.readdir(this.project.path, function (err, files) {
        console.log("read");
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        files.forEach((file) => {
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
      await git.log().then((value) => {
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
  },
};
</script>
