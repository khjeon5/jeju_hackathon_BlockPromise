<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">개발테스트페이지</h2>
    </v-col>
    <v-col>
      <h5 class="text-center">{{ tokenBalance }} {{ tokenName }}</h5>
      <h5 class="text-center">{{ token17Balance }}</h5>
      <h5 class="text-center">{{ saleList }}</h5>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'

export default {
  data() {
    return {
      tokenName: '',
      tokenBalance: '',
      token17Balance: '',
      saleList: '',
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
    this.token17Balance = await service.getMySneakersList(this.userInfo.klayAddress)
    this.saleList = await service.saleProducts()
  },
}
</script>

<style></style>
