<template>
  <div class="Pull">
    <h1>Pull</h1>

    <v-btn @click="GitPull" class="pink while--text">Git Pull</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    GitPull: () => {
      console.log("Pull files");
    },
  },
};
</script>

