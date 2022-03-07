import EasyAccess, { defaultMutations } from 'vuex-easy-access'
import CryptoJS from 'crypto-js'

export const state = () => ({
  locations: [],

  show_alert: false,
  loading: false,
  status: '',
  alert_title: '',
  alert_message: '',
})

export const mutations = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions = {
  // eslint-disable-next-line no-empty-pattern
  register({ dispatch }, body) {
    return this.$axios
      .post('api/privy/register', body)
      .then((response) => {
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/alert_title', `Create Account Success`)
        dispatch('set/alert_message', response.data.message)

        const convert = {
          user_id: response.data.data.user.id,
          phone: body.phone,
        }

        // Logic Crypto 10 Minutes
        const date = new Date()
        const minutes = 10
        date.setTime(date.getTime() + minutes * 60 * 1000)

        const cipher = CryptoJS.AES.encrypt(
          JSON.stringify(convert),
          this.$config.salt
        ).toString()

        this.$cookiz.set('__OTP', cipher.toString(), {
          path: '/',
          expires: date,
        })
        return true
      })
      .catch((err) => {
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        dispatch('set/alert_title', `Create Account Error`)
        if (err.response.data.error) {
          dispatch('set/alert_message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/alert_message',
            'Something went wrong. Please try again later...'
          )
        }

        return false
      })
  },
}
