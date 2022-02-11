<template>
  <div class="card">
    <div>
      <QuitLogo height="80px" />
    </div>
    <div>
      <p class="text-register">Register</p>
    </div>
    <div>
      <v-text-field
        label="Phone"
        placeholder="Phone number (+62)"
        solo
        required
        prepend-inner-icon="mdi-cellphone"
      />
    </div>
    <div>
      <v-text-field
        label="Password"
        placeholder="Secret Password"
        solo
        required
        prepend-inner-icon="mdi-key"
        append-icon="mdi-eye"
      />
    </div>
    <div><v-select :items="items" label="Select a country" solo /></div>
  </div>
</template>

<script>
import QuitLogo from '@/components/QuitLogo'

export default {
  name: 'RegisterComponent',
  components: {
    QuitLogo,
  },
  data() {
    const items = ['Foo', 'Bar', 'Fazz', 'Fezz']
    return {
      items,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      await this.$axios
        .get('/api/location')
        .then((res) => {})
        .catch((e) => {})
    },
  },
}
</script>

<style lang="scss">
.card {
  width: 26rem;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  margin: 4rem auto;

  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
}
.text-register {
  margin: 1rem 0;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-align: center;
}
</style>