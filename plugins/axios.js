import { set } from '@/utils'

const AxiosPlugin = ({ $axios, app, route, store, redirect }) => {
  // Handle Axios onRequest
  $axios.onRequest((config) => {
    if (route.name.includes('admin')) {
      const token = store.state.oauth.accessToken

      // eslint-disable-next-line no-prototype-builtins
      if (!config.headers.hasOwnProperty('Authorization') && token) {
        set(config.headers, 'Authorization', `Bearer ${token}`)
      }
    }
  })

  // Handle Axios onError
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)

    if (code === 401 && route.name.includes('admin')) {
      app.$logout('/401')
      return
    }

    if (code === 403 && route.name !== '/') {
      app.$logout('/403')
      return
    }

    if (code === 404) {
      if (route.name.includes('admin')) {
        app.$logout('/404')
      } else {
        redirect('/404')
      }
      return
    }

    if (code !== 401 && code !== 403 && route.name.includes('admin')) {
      app.$logout('/maintenance')
    } else {
      redirect('/maintenance')
    }
  })
}

export default AxiosPlugin
