<template>
  <div>
    <v-alert
      v-if="$store.state.music_file_path != null"
      class="mx-11"
      type="success"
    >
      Output file detected: {{ $store.state.music_file_path }}
    </v-alert>

    <v-alert icon="mdi-source-branch" type="info" class="mx-11">
        Current timeline/commit: {{ branch_name }}
    </v-alert>
    <v-btn class="ml-10" depressed @click="log">{{ buttonText }}</v-btn>
    <v-btn depressed @click="checkout_commit('master')">
      Back to Master timeline
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
              <!-- Play button not needed really, since music player pops up itself -->
              <!-- <div v-else-if="branch_name == launch.hash && output_file">
                <v-btn text small title="Play output file">
                  Play
                  <v-icon> mdi-play </v-icon>
                </v-btn>
              </div> -->
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-item>
    </v-timeline>
  </div>
</template>

<script>
import { getData, getOutputFilePath } from "../utils";

export default {
  data() {
    return {
      launches: [],
      buttonText: "Load Timeline",
      branch_name: "",
      output_file: null,
    };
  },
  computed: {
    items() {
      return this.launches;
    },
  },
  mounted() {
    this.branch_name = getData().current_project.branch_name;
    this.updateOutputFile();
  },
  methods: {
    sleep: (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
    async updateOutputFile() {
      await this.sleep(200); // Wait for output file/folder to be deleted during commit change
      const output_file_path = getOutputFilePath();
      console.log("OUTPUT FILE PATH: ", output_file_path);
      if (output_file_path) {
        this.output_file = output_file_path;
        this.$store.commit("setMusicFilePath", output_file_path);
      } else {
        this.output_file = null;
        this.$store.commit("setMusicFilePath", null);
      }
    },
    async log() {
      const git = require("../gitWrapper");
      await git.log().then((value) => {
        this.launches = value;
        console.log(this.launches);
        this.buttonText = "Reload timeline";
      });
    },
    async checkout_commit(hash) {
      // Before checkout, clear the player so that the output file won't be locked
      this.$store.commit("setMusicFilePath", null);
      await this.sleep(100); // Wait for state to change (just in case, and it works)
      // Also STOP the player from playing state since that is another thing that locks the file
      // Note: This is being done in separate file using $parent.$on and $emit, but still has issues maybe
      // due to the time delay in Vuex updating the state and the components recieving the state, during which
      // this async git.checkout function is already under way.

      // this.$root.$emit("stop");

      // while (!this.is_stopped) {
      //   console.log("Awaiting stop() of music")
      //   await this.sleep(100);
      // }

      // Finally checkout if music is stopped. The if condition is just to make sure
      // if (this.is_stopped) {
      //   console.log("GIT CHECKOUT after is_stopped")
      const git = require("../gitWrapper");
      await git.checkout(hash);
      this.branch_name = getData().current_project.branch_name;

      this.updateOutputFile();
      // }
      // else{
      //   console.log("WARNING: Music has NOT stopped: timeline.vue")
      // }
    },
  },
};
</script>

<style></style>
