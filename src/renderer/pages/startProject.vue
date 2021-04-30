<template>
  <div>
    <v-app-bar color="primary" flat>
      <h1 class="text-h5 white--text">Start a new project</h1>
    </v-app-bar>
    <div class="pt-10">
      <!-- <h1 align="center">
      Start a project
    </h1> -->
      <v-layout row wrap align-center justify-center>
        <v-card class="elevation-0 mt-10" width="60vw">
          <v-stepper v-if="!repoExists" v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Select folder and set Github path
              </v-stepper-step>

              <v-divider />

              <v-stepper-step :complete="e1 > 2" step="2">
                Add description
              </v-stepper-step>

              <v-divider />

              <v-stepper-step step="3">
                Confirm Project details
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form ref="form" v-model="invalid">
                  <v-file-input
                    label="Select file to get path"
                    required
                    @change="handleFileChange"
                  />

                  <div class="path">
                    <h5>Folder:</h5>
                    <p>{{ folder }}</p>
                  </div>
                  <p>{{ message }}</p>

                  <v-btn :disabled="!invalid" color="primary" @click="e1 = 2">
                    Continue
                  </v-btn>

                  <v-btn text @click="el = 1"> Cancel </v-btn>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="name"
                    :counter="50"
                    :rules="nameRules"
                    label="Project name"
                    required
                  />

                  <v-text-field
                    v-model="author"
                    :rules="nameRules"
                    label="Author"
                    required
                  />
                  <v-text-field
                    v-model="description"
                    :rules="descriptionRules"
                    label="Description"
                  />

                  <v-text-field v-model="genre" label="Genre" />
                  <v-select
                    v-model="daw"
                    :items="dawItems"
                    label="DAW"
                    required
                  />

                  <p>
                    Allow this app to handle my git requests and make changes in
                    my folder.
                  </p>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  />

                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="mr-4"
                    @click="e1 = 3"
                  >
                    Validate
                  </v-btn>
                </v-form>

                <v-btn text @click="e1 = 1"> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-alert v-if="repoCreationErrorShow" type="error">
                  {{ repoCreationError }}
                </v-alert>

                <div>
                  <h1>Project: {{ name }}</h1>
                  <h2>Author: {{ author }}</h2>
                  <p>Description: {{ description }}</p>
                  <p>Genre: {{ genre }}</p>
                  <p>DAW: {{ daw }}</p>
                  <p>Folder: {{ folder }}</p>
                </div>

                <v-btn color="primary" @click="submit"> Confirm </v-btn>

                <v-btn text @click="e1 = 1"> Cancel </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-layout>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getData, setData } from "../utils";

const fs = require("fs");

export default {
  data() {
    return {
      repoExists: false,
      path: "none",
      folder: "none",
      message: "",
      e1: 1,
      valid: false,
      invalid: true,
      dawItems: [
        "FL Studio",
        "Ableton Live",
        "Reason",
        "Logic Pro X",
        "Cubase",
      ],
      // reveal='false',
      name: "",
      author: "",
      description: "",
      genre: "",
      daw: "",
      checkbox: false,
      repoCreationError: "",
      repoCreationErrorShow: false,

      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length < 50) || "Name must be less than 50 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length < 50) || "Description must be less than 50 characters",
      ],
    };
  },
  mounted() {},
  methods: {
    handleFileChange(file) {
      console.log("file changes");
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
    },
    submit() {
      // Optimize
      this.name = this.name.trim();
      // End Optimization

      // Check if a remote Github repo with this project name exists. If it does, show error and return
      const access_token = this.$store.state.access_token;
      const data = {
        name: this.name,
        description: this.description,
        // Set to public in pre-release, release (Check README => Pre-release)
        private: true,
        auto_init: false,
      };
      axios({
        method: "post",
        url: "https://api.github.com/user/repos",
        data,
        headers: {
          accept: "application/vnd.github.v3+json",
          Authorization: "token " + access_token,
        },
      })
        .then((res) => {
          console.log("New repo created!");
          console.log("Response: ");
          console.log(res);

          // Only if repo creation is a success

          // Also append the same config data to the global config
          const globalConfigData = getData();
          const githubPath =
            "https://github.com/" +
            globalConfigData.user.login +
            "/" +
            this.name +
            ".git";

          // Project config creation
          const configPath = this.path + "\\projectConfig.json";
          const configData = {
            id: Math.floor(Math.random() * 10000),
            name: this.name,
            author: this.author,
            description: this.description,
            genre: this.genre,
            daw: this.daw,
            folder: this.folder,
            path: this.path,
            githubPath,
            repo_owner: getData().user.login,
            output_file: this.path + "\\output\\output.mp3",
          };
          // Required for project-level config
          fs.writeFileSync(
            configPath,
            JSON.stringify(configData),
            function (e) {
              console.log("Written to config file. e => " + e);
            }
          );
          // End of project config creation

          let projectsArray = globalConfigData.projects;
          if (projectsArray == undefined) projectsArray = [];

          configData.branch_name = "master"; // Only for globalConfig.
          projectsArray.push(configData);

          globalConfigData.projects = projectsArray;
          globalConfigData.current_project = configData;

          setData(globalConfigData);

          console.log("Projects array: ");
          console.log(projectsArray);
          // End of adding project to global config
          this.createGitFiles();

          this.$router.push("/details");
        })
        .catch((e) => {
          console.error("Error while creating new repo omg");
          console.log(e);
          this.repoCreationError =
            "Error while creating repository for project. Possibly the name already exists.";
          this.repoCreationErrorShow = true;
        });
      // End of remote repo check and creation
    },
    async createGitFiles() {
      const git = require("../gitWrapper");
      git.setPath();
      await git.init();
    },
    projectExists() {
      this.repoExists = true;
    },
    projectNotExists() {
      this.repoExists = false;
    },
  },
};
</script>

<style></style>
