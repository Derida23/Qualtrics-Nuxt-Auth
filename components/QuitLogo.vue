<template>
  <div class="quit-logo d-flex align-center justify-center">
    <img src="/assets/qualtrics-logo.png" alt="logo" />
  </div>
</template>

<script>
export default {
  name: 'QuitLogo',
  // props: {
  //   value: { type: String, default: '' },
  //   user: { type: Function, default: () => {}, require: true },
  // },
  // data() {
  //   return {
  //     count: 0,
  //   }
  // },
  // methods: {
  //   addCount() {
  //     this.count++
  //     this.$emit('counter', { value: this.count })
  //   },
  // },
}
</script>

<style lang="scss">
.quit-logo {
  img {
    height: 140px;
  }
}
</style>