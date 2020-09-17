<template>
  <v-row>
    <v-col>
      <v-row justify="center">
        <h2>회원가입</h2>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card max-width="400" class="mx-auto text-end" flat>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required @input="updateEmail"></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            value=""
            required
            @click:append="show = !show"
            @input="updatePassword"
          ></v-text-field>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required @input="updateName"></v-text-field>
          <v-text-field v-model="deliveryAddress" label="Delivery Address" required @input="updateAddress"></v-text-field>
          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      show: false,
      passwordRules: [v => !!v || 'Password is required', v => v.length >= 8 || 'Password min 8 characters'],
      checkbox: false,
      alertvalue: null,
      email: '',
      password: '',
      name: '',
      deliveryAddress: '',
    }
  },
  computed: {
    ...mapState(['userEmail', 'userPassword', 'userName', 'userHomeAddress']),
  },
  methods: {
    updateEmail() {
      this.$store.state.userEmail = this.email
    },
    updatePassword() {
      this.$store.state.userPassword = this.password
    },
    updateName() {
      this.$store.state.userName = this.name
    },
    updateAddress() {
      this.$store.state.userHomeAddress = this.deliveryAddress
    },
    onDone() {
      this.alertvalue = true
    },
  },
}
</script>

<style>
/*  */
</style>
