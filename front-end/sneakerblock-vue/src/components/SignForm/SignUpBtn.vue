<template>
  <v-row>
    <v-col cols="12">
      <v-card max-width="400" class="mx-auto mt-3" flat>
        <v-row justify="end" v-if="signUpcount == 0">
          <v-btn :disabled="!valid" color="primary" class="mx-3" @click="toCreateWallet()">
            next
          </v-btn>
        </v-row>
        <v-row justify="space-between" v-if="signUpcount == 1">
          <v-btn color="teal white--text" class="mx-3" @click="before()">
            BEFORE
          </v-btn>
          <v-btn :disabled="!valid" color="primary" class="mx-3" @click="signUpComplete()">
            JOIN
          </v-btn>
        </v-row>
        <v-row justify="end" v-if="signUpcount == 2">
          <v-btn :disabled="!valid" color="primary" class="mx-3" @click="toSignin()" router :to="{ name: 'SignIn' }">
            Sign In
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { caver } from '@/klaytn/caver'
import { mapState, mapMutations } from 'vuex'

import SIGNUP from '@/graphql/signup.gql'
//import gql from 'graphql-tag'

export default {
  data() {
    return {
      valid: true,
      btn: 0,
    }
  },
  computed: {
    ...mapState(['userEmail', 'userPassword', 'userName', 'userHomeAddress', 'userKlayAddress', 'userKlayPrivateKey', 'signUpcount', 'signUpName']),
  },
  methods: {
    ...mapMutations(['next', 'before', 'join', 'toSignin', 'createAccount']),
    signUpComplete() {
      this.$apollo
        .mutate({
          mutation: SIGNUP,
          variables: {
            email: this.userEmail,
            password: this.userPassword,
            name: this.userName,
            homeAddress: this.userHomeAddress,
            klayAddress: this.userKlayAddress,
            klayPrivateKey: this.userKlayPrivateKey,
          },
        })
        .then(result => {
          this.$store.state.signUpName = result.data.signUp.name
        })
      this.join()
    },
    toCreateWallet() {
      this.next()
      this.createAccount()
    },
  },
}
</script>

<style></style>
