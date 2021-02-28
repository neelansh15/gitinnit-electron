<template>
  <div id="container">
    <h1>This is push Module</h1>
    <div class="input">
      <v-file-input label="Select file to get path" @change="handleFileChange">Select Folder</v-file-input>
    </div>
    <div class="path">
      <h5>Folder:</h5>
      <p>{{ folder }}</p>
    </div>
    <button id="select" @click="pathConfirmed">Confirm</button>
    <p>{{ message }}</p>
    <div>
      <nuxt-link
        to="/"
      >
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
      message: ''
    }
  },
  methods: {
    handleFileChange (file) {
      if (file == null) {
        this.path = 'none'
        this.folder = 'No folder chosen'
        return
      }
      let pathToFile = file.path
      const index = pathToFile.lastIndexOf('\\')
      pathToFile = pathToFile.slice(0, index)
      this.path = pathToFile
      this.folder = pathToFile.slice((pathToFile.lastIndexOf('\\') + 1))
    },
    pathConfirmed () {
      if (this.path === 'none') {
        this.message = 'No folder chosen'
        return
      }
      this.message = 'git init'
      console.log(this.path)
    }
  }
}
</script>

<style>
#container{
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.input{
  width: 60vw;
}

.path{
  width: 60vw;
  display: flex;
  justify-content: space-around;
}
</style>
