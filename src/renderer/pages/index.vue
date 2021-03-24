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
                    <v-btn>
                      Retrive previous version
                    </v-btn>
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
                    <v-btn>
                      Confirm new changes
                    </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex xs12 sm12>
          <h2>Recent Projects:</h2>
          <div>
            <v-card
              v-for="project in projects"
              :key="project.name"
              class="mx-auto"
              max-width="1000"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">
                    Project Name: {{ project.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Author: {{ project.author }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey" />
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text>
                  <nuxt-link to="/details" exact>
                    View Details
                  </nuxt-link>
                </v-btn>
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
export default {
  data() {
    return {
      projects: [
        {
          name: "First Project",
          author: "Vedant"
        },
        {
          name: "First Project",
          author: "Parth"
        },
        {
          name: "First Project",
          author: "Neelansh"
        }
      ]
    };
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
