<template>
  <div id="App">
    <HomePage />
  </div>
</template>

<script>
import HomePage from '@/components/Home'

export default {
  name: 'IndexPage',
  components: {
    HomePage,
  },
  head() {
    return {
      title: 'Qualtrics Personal Profile System | Nuxt JS',
    }
  },
  // data() {
  //   return {
  //     propsValue: 'testing',
  //     emitValue: 0,
  //   }
  // },
  // methods: {
  //   handleCount({ value }) {
  //     this.emitValue = value
  //   },
  // },
}
</script>

