<template>
  <div>
    <v-app-bar color="primary" flat>
      <h1 class="text-h5 white--text">Clone a project</h1>
    </v-app-bar>
    <v-container class="pt-10">
      <!-- <h1 class="pb-10" align="center">Clone a project</h1> -->
      <v-card elevation="10" :loading="loading">
        <v-form ref="form" v-model="valid" class="pa-11">
          <v-text-field
            v-model="githubPath"
            label="Github Path"
            :rules="rules.path_field"
            required
          />

          <v-file-input
            label="Select file to get path"
            :rules="rules.file_input"
            @change="handleFileChange"
          >
            Select Folder
          </v-file-input>

          <div class="path">
            <h5>Path:</h5>
            <p>{{ path }}</p>
          </div>
          <p>{{ message }}</p>
          <v-btn :disabled="!valid" color="primary" class="mr-4" @click="clone">
            Continue
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getData, setData } from "../utils";
const fs = require("fs");

export default {
  data() {
    return {
      githubPath: "",
      path: "No folder selected",
      message: "",
      valid: false,
      loading: false,
      rules: {
        file_input: [(v) => !!v || "File path is required"],
        path_field: [(v) => !!v || "Github path is required"],
      },
    };
  },
  methods: {
    handleFileChange(file) {
      if (file == null) {
        this.path = "none";
        this.folder = "No folder choosen";
        this.valid = false;
        return;
      }

      let pathToFile = file.path;
      const index = pathToFile.lastIndexOf("\\");
      pathToFile = pathToFile.slice(0, index);
      this.path = pathToFile;
      this.path += "\\";
      this.folder = pathToFile.slice(pathToFile.lastIndexOf("\\") + 1);
      this.valid = true;
    },
    async clone() {
      this.loading = true;
      const git = require("../gitWrapper");
      this.githubPath += ".git";
      let dir = this.githubPath.substr(this.githubPath.lastIndexOf("/") + 1);
      const index = dir.indexOf(".");
      dir = dir.substr(0, index);
      this.path += dir;
      console.log(this.path);

      await git.clone(this.githubPath, this.path);

      const config = this.path + "/projectConfig.json";
      const configData = JSON.parse(
        fs.readFileSync(config, { encoding: "utf8", flag: "r" })
      );
      console.log(configData);
      configData.path = this.path;
      const globalConfigData = getData();
      let projectsArray = globalConfigData.projects;
      if (projectsArray == undefined) projectsArray = [];

      projectsArray.push(configData);
      globalConfigData.projects = projectsArray;
      globalConfigData.current_project = configData;

      setData(globalConfigData);
      this.loading = false;
      this.$router.push("/details");
    },
  },
};
</script>

<style></style>
