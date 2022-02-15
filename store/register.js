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
  // eslint-disable-next-line no-empty-pattern
  register({}, body) {
    return this.$axios
      .post('api/privy/register', body)
      .then((res) => {
        console.log(res)
        return true
      })
      .catch((e) => {
        console.error(e)

        return false
      })
  },
}
