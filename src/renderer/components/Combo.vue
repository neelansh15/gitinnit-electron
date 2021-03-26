
<template>
   
        <v-combobox
          v-model="select"
          :items="items"
          label="Combobox"
          multiple
          outlined
          dense
        >
        </v-combobox>
    
</template>
<script>
  export default {
    data () {
      return {
        select: ['Vuetify', 'Programming'],
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
      }
    },
  }
</script>