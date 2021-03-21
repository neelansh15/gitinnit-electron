<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Gitinnit </v-list-item-title>
          <v-list-item-subtitle> No project selected </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-slide-x-transition>
        <nuxt />
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/'
        },
        {
          title: 'Start a project',
          icon: 'mdi-plus',
          to: '/startproject'
        },
        {
          title: 'Account',
          icon: 'mdi-account',
          to: '/account'
        },
        {
          title: 'test',
          icon: 'mdi-account',
          to: '/details'
        }
      ]
    }
  }
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
