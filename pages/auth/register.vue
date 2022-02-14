<template>
  <RegisterComponent
    :locations="locations"
    :loading="loading"
    :form="form"
    @change="change"
  />
</template>

<script>
import RegisterComponent from '@/components/Auth/Register'

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
    getLocations() {
      this.$store.dispatch('location/getLocations')
    },

    change({ name, value }) {
      this.form[name] = value
    },
  },
}
</script>