<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  head() {
    return {
      title: 'Qualtrics Personal Profile System | Nuxt JS',
    }
  },
}
</script>


<style lang="scss">
main {
  background-color: #e6e9f1;
}
.v-btn {
  border-radius: 28px !important;
}
.v-text-field--outlined fieldset {
  border-radius: 10px;
}
</style>