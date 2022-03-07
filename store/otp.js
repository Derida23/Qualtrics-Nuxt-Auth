import EasyAccess, { defaultMutations } from 'vuex-easy-access'
import CryptoJS from 'crypto-js'

export const state = () => ({
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
  otp({ dispatch }, body) {
    const cookies = this.$cookiz.get('__OTP')

    if (!cookies) return false

    const bytes = CryptoJS.AES.decrypt(cookies, this.$config.salt)
    const deconvert = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    const data = { user_id: deconvert.user_id, otp_code: body.otp_code }

    return this.$axios
      .post('api/privy/register/otp/match', data)
      .then((response) => {
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/alert_title', `Create Account Success`)
        dispatch('set/alert_message', response.data.message)

        console.log('DATA ->', data)
        console.log('RESPONSE ->', response)

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
