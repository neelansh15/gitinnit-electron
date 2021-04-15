<template>
  <div>
    <v-card
      title="Click to manage collaborators"
      @click="show_dialog = true"
      class="pa-5"
    >
      <p class="text-overline">Collaborators</p>
    </v-card>
    <v-dialog v-model="show_dialog" width="400">
      <v-card>
        <v-card-title class="light-blue darken-2 white--text">
          Collaborators
        </v-card-title>
        <v-card-text>

        <!-- Text field to add user as collaborator -->
          <v-form @submit.prevent="addUserAsCollaborator" ref="form">
            <v-text-field
              class="mt-5"
              placeholder="Enter Github username to add"
              v-model="usernameToAdd"
              outlined
              
            ></v-text-field>
            <!-- <v-btn type="submit">+</v-btn> -->
          </v-form>

          <!-- List collaborators -->
          <v-list style="max-height: 300px" class="overflow-y-auto">
            <v-list-item v-for="n in 10" :key="n"
              >Collaborator {{ n }}</v-list-item
            >
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    show_dialog: false,
    collaborators: [],
    usernameToAdd: ''
  }),
  methods:{
      addUserAsCollaborator(){
          alert(`Adding ${this.usernameToAdd} as collaborator`)
          console.log(`Adding ${this.usernameToAdd} as collaborator`)
      }
  }
};
</script>

<style>
</style>