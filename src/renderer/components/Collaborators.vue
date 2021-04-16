<template>
  <div>
    <v-card
      title="Click to manage collaborators"
      @click="show_dialog = true"
      class="px-5 pt-3 pb-1"
      outlined
    >
      <p class="text-overline">Collaborators</p>
      <v-row class="mt-n5">
        <v-col>
          <v-tooltip
            color="blue-grey darken-4"
            v-for="collaborator in collaborators.data"
            :key="collaborator.id"
            top
          >
            <template v-slot:activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on" size="32" class="mr-1">
                <v-img :src="collaborator.avatar_url" />
              </v-avatar>
            </template>
            <span>{{ collaborator.login }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="show_dialog" width="400">
      <v-card>
        <v-card-title class="light-blue darken-2 white--text">
          Collaborators
        </v-card-title>
        <v-card-text>
          <div>
            <!-- Text field to add user as collaborator -->
            <v-text-field
              class="mt-5"
              label="Github username"
              v-model="usernameToAdd"
              title="Github username to add as collaborator"
              filled
              shaped
              :loading="loading"
            ></v-text-field>
            <v-btn class="mt-n5" depressed>Add</v-btn>
          </div>

          <!-- List collaborators -->
          <v-list style="max-height: 300px" class="overflow-y-auto">
            <v-list-item
              v-for="collaborator in collaborators.data"
              :key="collaborator.id"
            >
              <v-row align="center">
                <v-col cols="2">
                  <v-avatar v-bind="attrs" v-on="on" class="mr-1">
                    <v-img :src="collaborator.avatar_url" />
                  </v-avatar>
                </v-col>
                <v-col cols="6">
                  <span>{{ collaborator.login }}</span>
                </v-col>
                <v-col cols="4">
                  <v-chip color="blue" outlined  v-if="collaborator.login == loggedInUserName"
                    >You</v-chip
                  >
                  <v-btn
                    v-else
                    class="ml-4"
                    color="red"
                    :title="'Remove ' + collaborator.login + ' as collaborator'"
                    icon
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getCollaborators, getData } from "../utils";

export default {
  data: () => ({
    show_dialog: false,
    collaborators: [],
    usernameToAdd: "",
    loggedInUserName: "",
    loading: false,
  }),
  methods: {
    addUserAsCollaborator() {
      alert(`Adding ${this.usernameToAdd} as collaborator`);
    },
  },
  async mounted() {
    this.collaborators = await getCollaborators();
    this.loggedInUserName = getData().user.login;
    if (this.collaborators[0] == false) {
      this.collaborators = [];
      console.log("Collaborators.vue: Got false from utils getCollaborators");
    }
  },
};
</script>

<style>
</style>