import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  locations: [],

  show_alert: false,
  loading: false,
  status: '',
  message: '',
})

export const mutations = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions = {
  getLocations({ dispatch }) {
    dispatch('set/loading', true)

    this.$axios
      .get(`api/location`)
      .then((res) => {
        dispatch('set/loading', false)
        dispatch('set/status', 'success')
        dispatch('set/locations', res?.data?.data ?? [])
      })
      .catch((err) => {
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        dispatch('set/locations', [])
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...'
          )
          this.$sentry.captureException(err)
        }
      })
  },
}
