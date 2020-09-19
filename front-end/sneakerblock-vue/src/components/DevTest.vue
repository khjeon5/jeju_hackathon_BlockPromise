<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">개발테스트페이지</h2>
    </v-col>
    <v-col>
      <h5 class="text-center">{{ tokenBalance }} {{ tokenName }}</h5>
      <h5 class="text-center">{{ token17Balance }}</h5>
      <h5 class="text-center">{{ thisItemInfo }}</h5>
      <h5 class="text-center">{{ balanccc }}</h5>
      <v-btn color="teal darken-3 white--text" @click="bal">bal</v-btn>
      <v-btn color="teal darken-3 white--text" @click="test">테스트</v-btn>
      <h2>{{ key }}</h2>
      <h5 class="text-center">{{ thisItemInfo }}</h5>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'
import { caver } from '@/klaytn/caver'
// const FT = new caver.klay.KIP7('0x8C6dB9F1731f00aA262aaD3a969B9f965d426E07')
const service = new klaytnService()

export default {
  data() {
    return {
      tokenName: '',
      tokenBalance: '',
      token17Balance: '',
      saleList: '',
      thisItemInfo: '',
      balanccc: '',
      key: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations('wallet', ['setKlaytn']),
    async test() {
      await service.t()
    },
    async bal() {
      const address = '0x5ef1472f0e090db075dcc6efa74ad431a039823b'
      const key = '0x6ba296b80315d3d3bb2fc1f3bee4bf998af2235f9dd01d1c359bb6f48ebc409c'
      const keyring = caver.wallet.keyring.create(address, key)
      caver.wallet.add(keyring)
      console.log(caver.wallet.getKeyring(keyring.address))
    },
  },
  async created() {
    // const service = new klaytnService()
    this.tokenName = await service.getKIP7Symbol()
    this.tokenBalance = await service.getKIP7Balance(this.userInfo.klayAddress)
    this.token17Balance = await service.getMySneakersList(this.userInfo.klayAddress)
    this.saleList = await service.saleProducts()
    this.thisItemInfo = await service.paidSneakers(this.userInfo.klayAddress)
  },
}
</script>

<style></style>
