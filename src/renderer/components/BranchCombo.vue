<template>
  <v-container>
    <v-btn @click="branchNames" depressed>Timelines</v-btn>
    <v-combobox
      v-if="isLoaded"
      v-model="selected"
      :items="branches"
      :search-input.sync="search"
      hide-selected
      label="Select Timeline"
      persistent-hint
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
import { getData, setData } from "../utils";
export default {
  data() {
    return {
      branches: [],
      current_branch: "",
      selected: "",
      search: "",
      isLoaded: false,
      branchset: ""
    };
  },
  watch: {
    selected: "checkout_commit",

    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    }
  },

  mounted() {},
  methods: {
    async branchNames() {
      const git = require("../gitWrapper");
      const branchObject = await git.branch();
      // this.branches = Object.keys(branchObject);
      this.branches = branchObject.all;

      //Replace /remotes/origin/ with [Remote] $1
      this.branches = this.branches.map(element => {
        element = element.replace("remotes/origin/", "[Remote] ");
        return element;
      });

      this.current_branch = branchObject.current;
      this.isLoaded = true;
    },
    async checkout_commit() {
      // this.$store.commit('setMusicFilePath', null)
      // await this.sleep(100)
      const git = require("../gitWrapper");
      console.log(this.selected);
      let tempBranch = this.selected.replace("[Remote] ", "remotes/origin/");
      await git.checkout(tempBranch);

      const config = getData();
      config.current_project.branch_name = tempBranch;
      setData(config);

      this.branch_name = this.selected;
      this.$root.$emit("updateOutputFile");
    }
  }
};
</script>
