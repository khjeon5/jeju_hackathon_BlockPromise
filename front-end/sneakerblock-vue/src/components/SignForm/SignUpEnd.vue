<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <h2>가입 완료</h2>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card max-width="400" class="mx-auto text-center mt-12" flat>
        <h2>{{ signUpName }}님의 가입을 축하드립니다!!!</h2>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState(['userName', 'signUpName']),
  },
}
</script>

<style></style>
