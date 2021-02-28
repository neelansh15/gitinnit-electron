<template>
  <v-app>
     <!--Left div-->
    <div class="row">
      <div class="col s6">
        <div class="userInfo">
          <h3>img</h3>
          <h3>Username</h3>
        </div>
        <div class="generalLinks">
          <!--Vertical Nav-->
          <h3>General</h3>
          <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>
              <button>
                <nuxt-link to="/startProject" exact>
                  Start a project
                </nuxt-link>
              </button>
            </li>
            <li>Manage Samples</li>
          </ul>
        </div>
        <div class="accountLinks">
          <h3>
            <nuxt-link to="/account">
              Account
            </nuxt-link>
          </h3>
          <ul>
            <li>Sign out</li>
          </ul>
        </div>
      </div>
    </div>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
