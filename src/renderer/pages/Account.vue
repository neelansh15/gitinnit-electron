<template>
  <div class="mx-5 mt-5">
    <div class="d-flex align-center">
      <v-img
        src="https://img.icons8.com/bubbles/100/000000/gender-neutral-user.png"
        width="100"
        height="100"
        class="flex-grow-0"
      />
      <div class="mt-4">
        <h3>Neelansh Mathur</h3>
        <p class="text-caption">@mneelansh15</p>
      </div>
    </div>
    <v-btn @click="newWindow">New Window (Testing)</v-btn>
    <v-btn @click="login">Login</v-btn>
  </div>
</template>

<script>
const windowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }
}

export default {
  methods: {
    newWindow () {
      // Test creating a new window
      const electron = require('electron')
      const BrowserWindow = electron.BrowserView || electron.remote.BrowserWindow
      const mywindow = new BrowserWindow()
      mywindow.loadURL('https://github.com/login/oauth/authorize')
      mywindow.show()
    },
    login(){
      alert("Login with Github")
    }
  }
}
</script>

<style>
</style>
