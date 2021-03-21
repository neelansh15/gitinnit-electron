<template>
    <div>
        <h1>Timeline</h1>
        <v-btn @click="Commit()">Commit</v-btn>
    </div>
</template>

<script>
export default {
  data () {
    return {
        name: 'neelansh15',
        action: 'Merge',
        date: '01/1/2021',
        code: '098e45'
    }
  },
  methods:{
      Commit(){
          console.log(this.name)
      }
  }
  }; 

</script>

<style>


</style>