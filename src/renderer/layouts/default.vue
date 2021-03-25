<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Gitinnit </v-list-item-title>
          <v-list-item-subtitle>
            {{ current_project ? current_project.name : "No project selected" }}
            &middot; &nbsp; 
            <span v-if="current_project" class="teal--text text-darken-3">{{
                  current_project.genre
                }}</span>
          </v-list-item-subtitle>
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
      <v-slide-x-transition>
        <nuxt />
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
import pkg from "../../../package.json";

const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");

export default {
  data() {
    return {
      current_project: null,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: "/",
        },
        {
          title: "Details",
          icon: "mdi-book-open",
          to: "/details",
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
  mounted() {
    //NOTE: NOT REACTIVE AT THE MOMENT. DO SOMETHING ABOUT THIS, USE VUEX TO TRIGGER

    //Fetch current project if exists
    const globalConfigPath =
      app.getPath("appData") + "\\" + pkg.name + "\\globalConfig.json";
    if (fs.existsSync(globalConfigPath)) {
      const globalConfigData = JSON.parse(fs.readFileSync(globalConfigPath));
      if (globalConfigData.current_project) {
        this.current_project = globalConfigData.current_project;
      }
    }

    console.log("SIDEBAR: current_project = " + this.current_project);
  },
};
</script>

<style>
body {
  margin: 0 !important;
}
</style>
