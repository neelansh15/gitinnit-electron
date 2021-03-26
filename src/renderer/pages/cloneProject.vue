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
        <h5>Folder:</h5>
        <p>{{ folder }}</p>
      </div>
      <p>{{ message }}</p>

      <v-btn :disabled="invalid" color="primary" @click="clone">
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
      folder: "",
      message: "",
      invalid: true
    };
  },
  methods: {
    handleFileChange(file) {
      if (file == null) {
        this.path = "none";
        this.folder = "No folder choosen";
        this.invalid = true;
        return;
      }
      let pathToFile = file.path;
      const index = pathToFile.lastIndexOf("\\");
      pathToFile = pathToFile.slice(0, index);
      this.path = pathToFile;
      this.folder = pathToFile.slice(pathToFile.lastIndexOf("\\") + 1);
      this.invalid = false;
    },
    clone() {
      const git = require("../gitWrapper");
      git.clone();
    }
  }
};
</script>

<style></style>
