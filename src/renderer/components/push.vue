<template>
  <div>
    <v-list-item>
      <template v-slot:default="{ active, }">
        <v-list-item-action>
          <v-checkbox
            :input-value="active"
            color="primary"
          />
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-subtitle>{{ namesArray[index] }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-list-item>
    </v-list-item-group>
    </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['namesArray', 'index']
}
</script>
