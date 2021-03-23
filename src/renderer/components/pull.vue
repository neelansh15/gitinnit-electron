<template>
  <div class="Pull">
    <v-btn @click="GitPull">Pull files</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    GitPull: () => {
      console.log("Pull files");
    }
  }
};
</script>
