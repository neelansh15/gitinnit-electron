<template>
  <v-container fluid>
    <v-btn @click="branchNames">Branch</v-btn>
    <v-combobox
      v-if="isLoaded"
      v-model="selected"
      :items="branches"
      :search-input.sync="search"
      hide-selected
      label="Select Branch"
      multiple
      persistent-hint
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong
              >". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      branches: [],
      selected: "",
      search: "",
      isLoaded: false
    };
  },

  mounted() {},
  watch: {
    selected: "branch",
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    }
  },
  methods: {
    async branchNames() {
      const git = require("../gitWrapper");
      this.branches = await git.branch();
      this.isLoaded = true;
    }
  }
};
</script>
