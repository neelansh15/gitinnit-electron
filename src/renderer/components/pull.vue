<template>
  <div class="Pull">
    <h1>Pull</h1>

    <v-btn class="pink while--text" @click="GitPull">Git Pull</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    GitPull: () => {
      console.log('Pull files')
    }
  }
}
</script>
