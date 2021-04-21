<template>
  <div>
    <p>{{playing}}</p>
    <p>
      {{
        $store.state.music_file_path == null
          ? "NULL"
          : $store.state.music_file_path
      }}
    </p>
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
    playing(){
      return this.$store.state.playing
    }
  },
  mounted() {
    this.branch_name = getData().current_project.branch_name;
    this.updateOutputFile();
  },
  updated() {
    this.updateOutputFile();
  },
  methods: {
    updateOutputFile() {
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
      //Before checkout, clear the player so that the output file won't be locked
      this.$store.commit("setMusicFilePath", null);
      //Also STOP the player from playing state since that is another thing that locks the file
      //Note: This is being done in separate file using $parent.$on and $emit, but still has issues maybe
      //due to the time delay in Vuex updating the state and the components recieving the state, during which
      //this async git.checkout function is already under way.
      //Prompt user to pause music before git checkout
      if (this.$store.state.playing == true) {
        // alert("Please pause the music before moving to another state")
        console.log("Need to prompt user to pause music now")
      } else {
        const git = require("../gitWrapper");
        await git.checkout(hash);
        this.branch_name = getData().current_project.branch_name;
      }
    },
  },
};
</script>

<style></style>
