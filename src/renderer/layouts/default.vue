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
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-group
            v-if="item.sublinks"
            prepend-icon="mdi-folder-plus"
            :value="true"
          >
            <!--Remove v-list-group__header from template to make it aligned correctly -->
            <template v-slot:activator>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in item.sublinks"
              :key="sublink.title"
              link
              class="pl-7"
              :to="sublink.to"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ sublink.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <!-- Music Player -->
        <v-slide-y-reverse-transition>
          <v-row
            justify="center"
            align="center"
            style="margin-top: auto"
            v-if="music_file_path != null"
          >
            <v-col>
              <vuetify-audio :file="music_file_path" color="teal" ref="vuetifyaudio" flat />
            </v-col>
          </v-row>
        </v-slide-y-reverse-transition>
        <!-- End of Music Player -->
      </template>
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
import VuetifyAudio from "../components/VuetifyAudio";

const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");

export default {
  components: {
    VuetifyAudio,
  },
  data() {
    return {
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

          to: "/",
          sublinks: [
            {
              title: "Create a new project",
              icon: "mdi-plus",
              to: "/startproject",
            },
            {
              title: "Clone a project",
              icon: "mdi-cloud-download",
              to: "/cloneProject",
            },
          ],
        },
        {
          title: "Account",
          icon: "mdi-account",
          to: "/account",
        },
      ],
    };
  },
  computed: {
    current_project: {
      get() {
        return this.$store.state.current_project;
      },
      set(val) {
        // Not really needed but strange error without set()
        this.$store.commit("setCurrentProject", val);
      },
    },
    music_file_path() {
      //Fix file lock issues during git checkout
      if(this.$store.state.music_file_path == null){
        this.$emit('pause')
        this.$emit('stop')
      }

      return this.$store.state.music_file_path;
    },
  },
  mounted() {
    // NOTE: NOT REACTIVE AT THE MOMENT. DO SOMETHING ABOUT THIS, USE VUEX TO TRIGGER

    // Fetch current project if exists
    const globalConfigPath =
      app.getPath("appData") + "\\" + pkg.name + "\\globalConfig.json";
    if (fs.existsSync(globalConfigPath)) {
      const globalConfigData = JSON.parse(fs.readFileSync(globalConfigPath));
      if (globalConfigData.current_project) {
        this.current_project = globalConfigData.current_project;
      }
    }

    console.log("SIDEBAR: current_project = ");
    console.log(this.current_project);
  },
};
</script>

<style>
body {
  margin: 0 !important;
}
</style>
