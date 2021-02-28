<template>
  <button @click="count++">
      This is my custom button {{ count }}
  </button>
</template>

<script>
export default {
    data(){
        return{
            count: 0
        }
    }
}
</script>

<style>

</style>