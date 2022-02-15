<template>
  <div class="card">
    <div>
      <QuitLogo height="80px" />
    </div>
    <div>
      <p class="text-register">Register</p>
    </div>
    <v-form @submit.prevent="handleSave">
      <div>
        <v-text-field
          label="Phone"
          :value="form.phone"
          placeholder="Phone number (+62)"
          phone
          solo
          required
          prepend-inner-icon="mdi-cellphone"
          @input="$emit('change', { name: 'phone', value: $event })"
        />
      </div>
      <div>
        <v-text-field
          label="Password"
          placeholder="Secret Password"
          required
          solo
          prepend-inner-icon="mdi-key"
          :value="form.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          @input="$emit('change', { name: 'password', value: $event })"
        />
      </div>
      <div>
        <v-autocomplete
          item-text="name"
          item-value="lat"
          label="Select a country"
          solo
          return-object
          :items="loading ? [] : locations"
          :loading="loading"
          @change="(e) => select(e)"
        />
      </div>
      <div>
        <v-btn
          type="submit"
          block
          elevation="2"
          class="ma-2 white--text"
          color="#1890FF"
          large
          >Register <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import QuitLogo from '@/components/quit-logo'

export default {
  name: 'RegisterComponent',
  components: {
    QuitLogo,
  },
  props: {
    locations: { type: Array, default: () => {} },
    loading: { type: Boolean, default: () => {} },
    form: { type: Object, default: () => {} },
    select: { type: Function, default: () => {} },
    handleSave: { type: Function, default: () => {} },
  },
  data() {
    return {
      show: false,
    }
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