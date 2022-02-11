<template>
  <div class="d-flex align-center justify-center">
    <img
      src="/assets/qualtrics-logo.png"
      class="quit-logo"
      alt="logo"
      :style="cssVars"
      @click="$router.push('/')"
    />
  </div>
</template>

<script>
export default {
  name: 'QuitLogo',
  props: {
    height: { type: String, default: '140px' },
  },
  computed: {
    cssVars() {
      return {
        '--height': this.height,
      }
    },
  },
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

<style lang="scss" scoped>
.quit-logo {
  height: var(--height);
  cursor: pointer;
}
</style>