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
            <v-btn
              class="mt-n5"
              :title="'Add ' + usernameToAdd + ' as collaborator'"
              @click="addUserAsCollaborator"
              depressed
              >Add</v-btn
            >
          </div>

          <!-- List collaborators -->
          <v-list style="max-height: 350px" class="overflow-y-auto">
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
                  <span class="text-subtitle-2">{{ collaborator.login }}</span>
                </v-col>
                <v-col cols="4">
                  <v-chip
                    color="blue"
                    outlined
                    v-if="collaborator.login == loggedInUserName"
                    >You</v-chip
                  >
                  <v-btn
                    v-else
                    class="ml-4"
                    color="red"
                    :title="'Remove ' + collaborator.login + ' as collaborator'"
                    @click="removeUserAsCollaborator(collaborator.login)"
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

      <v-dialog max-width="400" v-model="show_dialog_2">
        <v-card :color="dialog_2_color">
          <v-card-title v-if="dialog_2_color == 'teal'">Success</v-card-title>
          <v-card-title v-else-if="dialog_2_color == 'yellow'"
            >Already a collaborator</v-card-title
          >
          <v-card-title v-else-if="dialog_2_color == 'red'">Error</v-card-title>
          <v-card-text>
            {{ dialog_2_text }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="dialog_2_color"
              @click="show_dialog_2 = false"
              depressed
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { getCollaborators, getData } from "../utils";

export default {
  data: () => ({
    //Defining attrs and on to get rid of errors although it works fine without it
    attrs: null,
    on: null,

    show_dialog: false,

    show_dialog_2: false,
    dialog_2_color: "success",
    dialog_2_text: "",

    collaborators: [],
    usernameToAdd: "",
    loggedInUserName: "",
    repo_name: "",
    loading: false,
  }),
  methods: {
    addUserAsCollaborator() {
      if (this.usernameToAdd.length > 0) {
        axios({
          method: "PUT",
          url: `https://api.github.com/repos/${this.loggedInUserName}/${this.repo_name}/collaborators/${this.usernameToAdd}?permissions=admin`,
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "token " + this.$store.state.access_token,
          },
        })
          .then((res) => {
            console.log("Adding user as collaborator");
            console.log(res);
            if (res.status == 201) {
              this.dialog_2_color = "teal";
              this.dialog_2_text = `Request sent to ${this.usernameToAdd}. Ask them to check their email linked with their Github account! They can accept the invite from there.`;
              this.show_dialog_2 = true;
              this.usernameToAdd = "";
            } else if (res.status == 204) {
              this.dialog_2_color = "yellow";
              this.dialog_2_text = `${this.usernameToAdd} is already a collaborator`;
              this.show_dialog_2 = true;
            }
          })
          .catch((e) => {
            this.dialog_2_color = "red";
            this.dialog_2_text = `Unable to add user as collaborator. Make sure the username exists. Reason => ${e}`;
            this.show_dialog_2 = true;
          });
      }
    },

    async removeUserAsCollaborator(username) {
      //Confirm first
      const confirm_delete = confirm(
        `Confirm removal of ${username} as collaborator?`
      );
      if (confirm_delete) {
        axios({
          method: "DELETE",
          url: `https://api.github.com/repos/${this.loggedInUserName}/${this.repo_name}/collaborators/${username}`,
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "token " + this.$store.state.access_token,
          },
        })
          .then((res) => {
            if (res.status == 204) {
              this.dialog_2_color = "teal";
              this.dialog_2_text = `Successfully removed ${username} as collaborator`;
              this.show_dialog_2 = true;

              return getCollaborators(); //Can't use await because this is not an async function. But should work fine
            } else {
              console.error(
                "Mysterious error in removeUserAsCollaborator. Response: " +
                  res.data
              );
            }
          })
          .then((collabs) => {
            if(collabs){
              this.collaborators = collabs
            }
          })
          .catch((e) => {
            this.dialog_2_color = "red";
            this.dialog_2_text = `Unable to remove ${username} as collaborator. Reason => ${e}`;
            this.show_dialog_2 = true;

            console.log("Upcoming error is from removeUserAsCollaborator()")
            console.error(e)
          });
      }
    },
  },
  async mounted() {
    this.collaborators = await getCollaborators();
    this.loggedInUserName = getData().user.login;

    this.repo_name = getData().current_project.name;
    // this.repo_name = getData().current_project.githubPath //For later use in adding user as collaborator
    // this.repo_name = this.repo_name.slice(0, this.repo_name.length - 3) //Remove .git at the end

    if (this.collaborators[0] == false) {
      this.collaborators = [];
      console.log("Collaborators.vue: Got false from utils getCollaborators");
    }
  },
};
</script>

<style>
</style>