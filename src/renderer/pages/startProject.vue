<template>
  <div id="container">
    <v-btn to="/details">Conditional</v-btn>
    <h1>Start a new project</h1>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Select folder
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="e1 > 2" step="2">
          Add description
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="3"> Confirm Project details </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="input">
            <v-file-input
              label="Select file to get path"
              @change="handleFileChange"
            >
              Select Folder
            </v-file-input>
          </div>
          <div class="path">
            <h5>Folder:</h5>
            <p>{{ folder }}</p>
          </div>
          <p>{{ message }}</p>

          <v-btn :disabled="invalid" color="primary" @click="e1 = 2">
            Continue
          </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="name"
              :counter="30"
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
            <v-select v-model="daw" :items="dawItems" label="DAW" required />

            <p>
              Allow this app to handle my git requests and make changes in my
              folder
            </p>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
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

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <h1>Project: {{ name }}</h1>
            <h2>Author: {{ author }}</h2>
            <p>Description: {{ description }}</p>
            <p>Genre: {{ genre }}</p>
            <p>DAW: {{ daw }}</p>
            <p>Folder: {{ folder }}</p>
          </div>

          <v-btn @click="submit" color="primary"> Confirm </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <nuxt-link to="/" exact> Back to Dashboard </nuxt-link>
  </div>
</template>

<script>
const fs = require("fs");

export default {
  data() {
    return {
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
        "Cubase"
      ],
      name: "",
      author: "",
      description: "",
      genre: "",
      daw: "",
      checkbox: false,

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length < 30) || "Name must be less than 10 characters"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length < 50) || "Description must be less than 50 characters"
      ]
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
    submit() {
      const configPath = this.path + "\\projectConfig.json";
      const configData = {
        name: this.name,
        author: this.author,
        description: this.description,
        genre: this.genre,
        daw: this.daw,
        folder: this.folder
      };
      fs.writeFileSync(configPath, JSON.stringify(configData), function(e) {
        console.assert("Written to config file. e => " + e);
      });
      alert("Created new project config file!");
      window.location.href = "/details";
    }
  }
};
</script>

<style>
#container {
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.input {
  width: 60vw;
}

.path {
  width: 60vw;
  display: flex;
  justify-content: space-around;
}
</style>
