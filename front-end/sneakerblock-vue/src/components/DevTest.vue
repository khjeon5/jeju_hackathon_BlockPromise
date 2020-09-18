<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">개발테스트페이지</h2>
    </v-col>
    <v-col>
      <h5 class="text-center">{{ tokenBalance }} {{ tokenName }}</h5>
    </v-col>
  </v-row>
</template>

<script>
// import { getContractInstanceToken7 } from '@/klaytn/caver'
import { mapMutations, mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'

export default {
  data() {
    return {
      tokenName: '',
      tokenBalance: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations('wallet', ['setKlaytn']),
  },
  async created() {
    const service = new klaytnService()
    this.tokenName = await service.getKIP7Symbol()
    this.tokenBalance = await service.getKIP7Balance(this.userInfo.klayAddress)
  },
}
</script>

<style></style>
