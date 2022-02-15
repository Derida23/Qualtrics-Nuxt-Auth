<template>
  <RegisterComponent
    :locations="locations"
    :loading="loading"
    :form="form"
    :select="select"
    :handle-save="handleSave"
    @change="change"
  />
</template>

<script>
import RegisterComponent from '@/components/auth/register'

export default {
  name: 'RegisterPage',
  components: {
    RegisterComponent,
  },
  data() {
    return {
      form: {
        phone: '',
        password: '',
        country: '',
        latlong: '',
        device_token: '',
        device_type: 2,
      },
    }
  },
  head: { title: 'Register Qualtrics' },
  computed: {
    locations() {
      return this.$store.get('location/locations')
    },
    loading() {
      return this.$store.get('location/loading')
    },
    // status() {
    //   return this.$store.get('location/status')
    // },
    // message() {
    //   return this.$store.get('location/message')
    // },
  },
  mounted() {
    this.getLocations()
  },
  methods: {
    async getLocations() {
      await this.$store.dispatch('location/getLocations')
    },
    change({ name, value }) {
      this.form[name] = value
    },
    select(value) {
      this.form = {
        ...this.form,
        latlong: `${value.lat},${value.long},`,
        country: value.name,
      }
    },
    async handleSave() {
      await this.$store.dispatch('register/register', this.form)
    },
  },
}
</script>