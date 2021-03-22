<template>
  <v-timeline>
    <v-item v-for="launches in launches" :key="launches">
      <v-timeline-item large>
        <template v-slot:opposite>
          <span>{{ launches.date }}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline"
            >code: {{ launches.code }}
          </v-card-title>
          <v-card-subtitle>Name : {{ launches.name }}</v-card-subtitle>
          <v-card-text>
            {{ launches.commit }}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-item>
  </v-timeline>
</template>

<script>
export default {
  data() {
    return {
      launches: [
        {
          name: "neelansh15",
          commit: "New changes",
          code: "#1234",
          date: "01/12/2021",
        },
        {
          name: "neelansh15",
          commit: "Old changes",
          code: "#5678",
          date: "02/12/2021",
        },
      ],
    };
  },
};
</script>

<style >
</style>