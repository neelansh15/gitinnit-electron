<template>
  <v-app>
    <!-- <div class="row">
      <div class="col s6">
        <div class="userInfo">
          <h3>img</h3>
          <h3>Username</h3>
        </div>
        <div class="generalLinks">
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
            <nuxt-link to="/account"> Account </nuxt-link>
          </h3>
          <ul>
            <li>Sign out</li>
          </ul>
        </div>
      </div>
    </div> -->
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Gitinnit </v-list-item-title>
          <v-list-item-subtitle> Welcome, John! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: "/",
        },
        {
          title: "Start a project",
          icon: "mdi-plus",
          to: "/startproject",
        },
        {
          title: "Account",
          icon: "mdi-account",
          to: "/account",
        },
      ],
    };
  },
};
</script>

<style>
body {
  margin: 0 !important;
}
</style>
