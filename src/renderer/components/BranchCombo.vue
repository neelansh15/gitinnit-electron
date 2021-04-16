<template>
  <v-container fluid>
    <v-combobox
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
              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
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
      selected: " ",
    };
  },

  mounted() {
    this.branch();
  },
   watch: {
     selected: "branch",
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      }
      },
  methods: {
   async branch() {
      const git = require("../gitWrapper");
      await git.branch().then(value => {
        this.branches = value;
        console.log(this.branches);
      });
    }
  },
};
</script>