<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="githubPath"
            label="Github Path"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-file-input
            label="Select file to get path"
            @change="handleFileChange"
          >
            Select Folder
          </v-file-input>
        </v-col>
      </v-row>
      <div class="path">
        <h5>Path:</h5>
        <p>{{ path }}</p>
      </div>
      <p>{{ message }}</p>

      <v-btn :disabled="!valid" color="primary" @click="clone">
        Continue
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      githubPath: "",
      path: "",
      message: "",
      valid: false
    };
  },
  methods: {
    handleFileChange(file) {
      if (file == null) {
        this.path = "none";
        this.invalid = true;
        return;
      }
      let pathToFile = file.path;
      this.path = pathToFile;
      this.invalid = false;
    },
    clone() {
      const git = require("../gitWrapper");
      git.setPath();
      git.clone();
    }
  }
};
</script>

<style></style>
