<template>
<div>
  
  <v-layout row wrap align-center justify-center>
    
      <v-card class="elevation-0 mt-10" width="60vw">
              <v-card-title primary-title class="layout justify-center">
                <h1>Start Project</h1>
                </v-card-title>
 
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

          <v-btn color="primary" @click="submit"> Confirm </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-card>
         
      </v-layout>
</div>
</template>

<script>
import pkg from '../../../package.json'

const { remote } = require('electron')
const { app } = remote
const fs = require('fs')

export default {
  data () {
    return {
      path: 'none',
      githubPath: 'https://github.com/devs4shah/Testing1.git',
      folder: 'none',
      message: '',
      e1: 1,
      valid: false,
      invalid: true,
      dawItems: [
        'FL Studio',
        'Ableton Live',
        'Reason',
        'Logic Pro X',
        'Cubase'
      ],
      // reveal='false',
      name: '',
      author: '',
      description: '',
      genre: '',
      daw: '',
      checkbox: false,

      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length < 30) || 'Name must be less than 10 characters'
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v =>
          (v && v.length < 50) || 'Description must be less than 50 characters'
      ]
    }
  },
  mounted () {},
  methods: {
    handleFileChange (file) {
      if (file == null) {
        this.path = 'none'
        this.folder = 'No folder choosen'
        this.invalid = true
        return
      }
      let pathToFile = file.path
      const index = pathToFile.lastIndexOf('\\')
      pathToFile = pathToFile.slice(0, index)
      this.path = pathToFile
      this.folder = pathToFile.slice(pathToFile.lastIndexOf('\\') + 1)
      this.invalid = false
    },
    submit () {
      const configPath = this.path + '\\projectConfig.json'
      const configData = {
        id: Math.floor(Math.random() * 10000),
        name: this.name,
        author: this.author,
        description: this.description,
        genre: this.genre,
        daw: this.daw,
        folder: this.folder,
        path: this.path,
        githubPath: this.githubPath
      }
      fs.writeFileSync(configPath, JSON.stringify(configData), function (e) {
        console.assert('Written to config file. e => ' + e)
      })
      alert('Created new project config file!')

      // Also append the same config data to the global config
      const globalConfigPath =
        app.getPath('appData') + '\\' + pkg.name + '\\globalConfig.json'

      const globalConfigData = JSON.parse(fs.readFileSync(globalConfigPath))
      let projectsArray = globalConfigData.projects
      if (projectsArray == undefined) projectsArray = []

      projectsArray.push(configData)
      globalConfigData.projects = projectsArray
      globalConfigData.current_project = configData
      fs.writeFileSync(globalConfigPath, JSON.stringify(globalConfigData), () => {
        console.log('Added project to global config')
      })

      console.log('Projects array: ')
      console.log(projectsArray)
      // End of adding project to global config

      const git = require('../gitWrapper')
      git.setPath(this.path, this.githubPath)
      git.init()
      this.$router.push('/details')
    }
  }
}
</script>




<style>
</style>
