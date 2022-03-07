<template>
  <div class="card">
    <div>
      <h2 class="flex">OTP Verification</h2>
      <p class="mt-5 mb-5 text-center">
        Enter the OTP lever code that was sent via <b>message phone</b>.
      </p>
    </div>
    <v-otp-input
      v-model="otp_code"
      length="4"
      :error-messages="$v.otp_code.$dirty ? errorOtp : []"
      :loading="loadSave"
      :disabled="loadSave"
      @finish="submitOtp"
      @input="$v.otp_code.$touch()"
      @blur="$v.otp_code.$touch()"
    ></v-otp-input>
    <div>
      <p class="mt-10 text-center">
        Haven't got the code yet? <b>Resend OTP</b>
      </p>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'OtpPage',
  data() {
    return { otp_code: '', loadSave: false }
  },
  validations() {
    return {
      otp_code: { required, minLength: minLength(4), maxLength: maxLength(4) },
    }
  },
  head: { title: 'OTP Verification' },
  computed: {
    // Error Field
    errorOtp() {
      const errors = []
      if (!this.$v.otp_code.$dirty) return errors
      !this.$v.otp_code.required && errors.push('otp can not be empty')
      !this.$v.otp_code.minLength && errors.push('otp min 4')
      !this.$v.otp_code.maxLength && errors.push('otp min 4')
      return errors
    },
  },
  methods: {
    async submitOtp() {
      this.loadSave = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const res = await this.$store.dispatch('otp/otp', {
          otp_code: this.otp_code,
        })
        this.loadSave = false

        if (res) {
          this.$router.push('/')
        } else {
          this.$router.push('/')
        }
      } else {
        this.loadSave = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 26rem;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  margin: 4rem auto;

  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
