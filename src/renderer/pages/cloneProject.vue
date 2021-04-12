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
// import { getData, setData } from "../utils";
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
        this.folder = "No folder choosen";
        this.invalid = true;
        return;
      }

      let pathToFile = file.path;
      const index = pathToFile.lastIndexOf("\\");
      pathToFile = pathToFile.slice(0, index);
      this.path = pathToFile;
      this.path += "\\";
      this.folder = pathToFile.slice(pathToFile.lastIndexOf("\\") + 1);
    },
    clone() {
      const git = require("../gitWrapper");

      // const globalConfigData = getData();
      // const configPath = this.path + "\\projectConfig.json";
      // const configData = {
      //   folder: this.folder,
      //   path: this.path,
      //   githubPath: this.githubPath
      // };
      // fs.writeFileSync(configPath, JSON.stringify(configData), function(e) {
      //   console.log("Written to config file. e => " + e);
      // });
      // //End of project config creation

      // let projectsArray = globalConfigData.projects;
      // if (projectsArray == undefined) projectsArray = [];

      // projectsArray.push(configData);
      // globalConfigData.projects = projectsArray;
      // globalConfigData.current_project = configData;

      // setData(globalConfigData);

      // console.log("Projects array: ");
      // console.log(projectsArray);
      // git.setPath();
      this.githubPath += ".git";
      var dir = this.githubPath.substr(this.githubPath.lastIndexOf("/") + 1);
      var index = dir.indexOf(".");
      dir = dir.substr(0, index);
      this.path += dir;
      console.log(this.path);

      git.clone(this.githubPath, this.path);
      this.$router.push("/details");
    }
  }
};

// clone using githubpath
// fs.read ProjectConfig
// Combine path and folder
// add to projects array of global config
// set current project in global config
</script>

<style></style>
