<template>
  <div class="home d-flex justify-center align-center">
    <div>
      <QuitLogo />
      <v-row align="center" justify="center" class="mt-16">
        <v-btn
          elevation="2"
          class="ma-2 white--text"
          color="#1890FF"
          large
          @click="$router.push('/auth/register')"
          >Register <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn elevation="2" class="ma-2 white--text" color="#1890FF" large
          >Login <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
import QuitLogo from '@/components/quit-logo'

export default {
  name: 'HomePage',
  components: {
    QuitLogo,
  },
}
</script>

<style lang="scss">
.home {
  min-height: 95vh;
}
</style>
