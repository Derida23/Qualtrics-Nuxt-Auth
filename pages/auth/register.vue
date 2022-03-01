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
          id="phone"
          ref="phone"
          v-model="form.phone"
          type="tel"
          label="Phone"
          placeholder="Phone number (+62)"
          solo
          prepend-inner-icon="mdi-cellphone"
          :error-messages="$v.form.phone.$dirty ? errorPhone : []"
          @blur="$v.form.phone.$touch()"
        />
      </div>
      <div>
        <v-text-field
          id="password"
          ref="password"
          v-model="form.password"
          solo
          label="Password"
          placeholder="Secret Password"
          prepend-inner-icon="mdi-key"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :error-messages="$v.form.password.$dirty ? errorPassword : []"
          @click:append="show = !show"
          @input="$v.form.password.$touch()"
          @blur="$v.form.password.$touch()"
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
          :error-messages="$v.form.country.$dirty ? errorCountry : []"
          @change="(e) => handleSelect(e)"
          @blur="$v.form.country.$touch()"
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
          :loading="loadSave"
          :disabled="loadSave"
          >Register <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators'

const rulePhone = helpers.regex('rulePhone', /^(0|08|62)(\d{3,4}-?){2}\d{2,4}$/)

export default {
  name: 'RegisterPage',
  data() {
    return {
      show: false,
      loadSave: false,
      form: {
        phone: '',
        password: '',
        country: '',
        latlong: '',
        device_token: (Math.random() + 1).toString(36).substring(2),
        device_type: 2,
      },
    }
  },
  validations() {
    return {
      form: {
        phone: {
          required,
          rulePhone,
          minLength: minLength(10),
          maxLength: maxLength(14),
        },
        password: { required, minLength: minLength(8) },
        country: { required },
        latlong: { required },
        device_token: { required },
        device_type: 2,
      },
    }
  },
  head: { title: 'Register Qualtrics' },
  computed: {
    locations() {
      return this.$store.get('location/locations')
    },
    loading() {
      return this.$store.get('location/loading')
    },

    // Notification
    show_alert() {
      return this.$store.get('register/show_alert')
    },
    status() {
      return this.$store.get('register/status')
    },
    alert_title() {
      return this.$store.get('register/alert_title')
    },
    alert_message() {
      return this.$store.get('register/alert_message')
    },

    // Error Field
    errorPhone() {
      const errors = []
      if (!this.$v.form.phone.$dirty) return errors
      !this.$v.form.phone.required && errors.push('Phone can not be empty')
      !this.$v.form.phone.rulePhone && errors.push('Wrong phone number format')
      !this.$v.form.phone.minLength && errors.push('Phone number min 10')
      !this.$v.form.phone.maxLength && errors.push('Phone number max 14')
      return errors
    },

    errorPassword() {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required &&
        errors.push('Password can not be empty')
      !this.$v.form.password.minLength && errors.push('Password min 8')
      return errors
    },

    errorCountry() {
      const errors = []
      if (!this.$v.form.country.$dirty) return errors
      !this.$v.form.country.required && errors.push('Country can not be empty')
      return errors
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          type: this.status,
          title: this.alert_title,
          text: this.alert_message,
        })

        this.$store.set('register/show_alert', false)
      }
    },
  },
  mounted() {
    this.getLocations()
  },
  methods: {
    async getLocations() {
      await this.$store.dispatch('location/getLocations')
    },
    handleSelect(value) {
      this.form = {
        ...this.form,
        latlong: `${value.lat},${value.long},`,
        country: value.name,
      }
    },
    async handleSave() {
      this.loadSave = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const res = await this.$store.dispatch('register/register', this.form)
        console.log(res)
        this.loadSave = false
      } else {
        this.loadSave = false
      }
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
