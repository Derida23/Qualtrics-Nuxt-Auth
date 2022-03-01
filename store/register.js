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

        // Logic Basic
        const cipher = CryptoJS.AES.encrypt(
          body.phone.toString(),
          CryptoJS.enc.Utf8.parse(this.$config.salt),
          {
            iv: CryptoJS.enc.Utf8.parse('The V Janji Mantab'), // parse the IV
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
          }
        )

        console.log(cipher.toString())
        // this.$cookiz.set('otp_phone', encrypt, {
        //   path: '/',
        //   maxAge: 60 * 60 * 24 * 1,
        // })
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
