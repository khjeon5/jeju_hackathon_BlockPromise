<template>
  <v-row>
    <v-col>
      <v-row justify="center">
        <h2>지갑 생성</h2>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card max-width="400" class="mx-auto" flat>
        <v-form ref="form">
          <v-text-field :value="userKlayAddress" label="Klaytn-Address" filled readonly></v-text-field>
          <v-textarea label="Private-Key" filled auto-grow readonly :value="userKlayPrivateKey"></v-textarea>
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
      //
    }
  },
  computed: {
    ...mapState(['userKlayAddress', 'userKlayPrivateKey']),
  },
  methods: {
    //
  },
}
</script>

<style></style>
