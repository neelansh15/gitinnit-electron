<template>
  <div id="container">
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

        <v-stepper-step step="3">
          Confirm Project details
        </v-stepper-step>
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
          <button id="select" @click="pathConfirmed">Confirm</button>
          <p>{{ message }}</p>

          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px" />

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px" />

          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <h1>This is push Module</h1>

    <div>
      <nuxt-link to="/">
        Back
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: 'none',
      folder: 'none',
      message: '',
      e1: 1
    }
  },
  methods: {
    handleFileChange (file) {
      if (file == null) {
        this.path = 'none'
        this.folder = 'No folder choosen'
        return
      }
      let pathToFile = file.path
      const index = pathToFile.lastIndexOf('\\')
      pathToFile = pathToFile.slice(0, index)
      this.path = pathToFile
      this.folder = pathToFile.slice(pathToFile.lastIndexOf('\\') + 1)
    },
    pathConfirmed () {
      if (this.path === 'none') {
        this.message = 'No folder choosen'
        return
      }
      this.message = 'git init'
      console.log(this.path)
    }
  }
}
</script>

<style>
#container {
  width: 100vw;
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
