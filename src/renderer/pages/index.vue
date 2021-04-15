<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <!-- xs12 and sm12 to make it responsive = 12 columns on mobile and 6 columns from medium to XL layouts -->
        <v-flex xs12 sm12>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="1200" height="200">
                <v-card-text class="text-center">
                  <div>
                    <h3>Liked the previous version better.</h3>
                    <p>Revert changes?</p>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <nuxt-link to="/details" exact>
                    <v-btn> Retrive previous version </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="1200" height="200">
                <v-card-text class="text-center">
                  <div>
                    <h3>Liked the sound of new version.</h3>
                    <p>Apply changes?</p>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <nuxt-link to="/details" exact>
                    <v-btn> Confirm new changes </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex xs12 sm12>
          <h2>Recent Projects</h2>
          <div class="mt-5">
            <v-card
              v-for="project in projects"
              :key="project.id"
              class="mx-auto"
              max-width="1000"
              outlined
            >
              <v-card-title>{{ project.name }}</v-card-title>
              <v-card-subtitle>
                {{ project.author }} &middot;&nbsp;
                <span class="teal--text text-darken-3">{{
                  project.genre
                }}</span>
                &middot;&nbsp;
                <span class="brown--text text-darken-1">{{
                  project.path
                }}</span></v-card-subtitle
              >
              <v-card-actions>
                <v-btn @click="setCurrentProject(project)" v-if="project.id != current_project.id" text>
                  Set as current project
                </v-btn>
                <v-chip color="primary" class="ml-1" small v-else>Current project</v-chip>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!--Right Div-->

    <!-- Recent Projects -->
  </div>
</template>

<script>
const {getData, setData} = require("../utils");

export default {
  data() {
    return {
      projects: [],
      current_project: {}
    };
  },
  methods:{
    setCurrentProject(project){
      let globalConfigObj = getData()
      globalConfigObj.current_project = project
      setData(globalConfigObj)

      this.current_project = getData().current_project
      this.$store.commit('setCurrentProject', project)

      // console.log("TRIGGERED change project ")
      // console.log(getData().current_project)
    }
  },
  mounted() {
    // Fetch projects if globalConfig exists
    this.projects = getData().projects.reverse();
    this.current_project = getData().current_project
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
