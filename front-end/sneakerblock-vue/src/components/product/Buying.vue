<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">결제 페이지</h2>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="pt-0">
      <v-card class="max-auto" flat color="grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-row justify="center" class="mx-1 mt-12 mb-6">
                <v-card class="max-auto" flat>
                  <v-img :src="require(`@/assets/sneakers/${this.$route.params.id}.jpg`)"></v-img>
                </v-card>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-center">
              <h1 class="mb-3">{{ thisItemInfo[2] }}</h1>
              <h2 class="mb-1">가격: {{ thisItemInfo[1] }} XKRW</h2>
              <h2 class="mb-1">판매자: {{ pan }}</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

    <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="pt-0">
      <v-card class="max-auto" flat>
        <v-container class="pt-0">
          <v-row>
            <v-col cols="12">
              <h2 class="mb-3">구매자 정보</h2>
              <h3 class="mb-1">이름: {{ userInfo.name }}</h3>
              <h3 class="mb-1">배송지: {{ userInfo.homeAddress }}</h3>
            </v-col>
            <v-col cols="12">
              <h2 class="mb-3">결제 정보</h2>
              <h3>내 지갑 주소 : {{ userInfo.klayAddress }}</h3>
              <h3>내 토큰 잔액 : {{ token7Balance }} XKRW</h3>
              <h3>결제 금액 : {{ thisItemInfo[1] }} XKRW</h3>
            </v-col>
            <v-col cols="12">
              <v-row justify="end" class="mx-1">
                <v-btn color="teal darken-3 white--text" @click="purchaseItem">결제</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ITEMDETAIL from '@/graphql/itemDetail.gql'
import { mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  data() {
    return {
      itemInfo: {},
      myaddress: '0x19687755badea96d0d6f485ad7264a4af56879b9',
      mypriv: '0x186c1d383964f07df3d76421dad200a9e105b3d3599ad9c5fbbf97cb0b260d2c',
      toaddress: '0x8e505cd541178775eabbdaadc9834e3cf7f1a355',
      thisItemInfo: '',
      pan: '지드래곤',
      token7Balance: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    async getMyToken7() {
      this.token7Balance = await service.getKIP7Balance(this.userInfo.klayAddress)
    },
    async getItemInfo() {
      this.thisItemInfo = await service.getProductInfo(this.$route.params.id)
    },
    async purchaseItem() {
      await service.keyringSet(this.userInfo.klayAddress, this.userInfo.klayPrivateKey)

      await service.payToken7(this.userInfo.klayAddress, this.thisItemInfo[1], this.thisItemInfo[0])

      await service.keyringExpire(this.userInfo.klayAddress)
    },
    itemDetail() {
      this.$apollo
        .query({
          query: ITEMDETAIL,
          variables: {
            tokenID: parseInt(this.$route.params.id, 10),
          },
        })
        .then(result => {
          this.itemInfo = result.data.itemDetail
        })
    },
  },
  async created() {
    this.getItemInfo()
    this.getMyToken7()
    // this.itemDetail()
    this.$socket.on('connect', function() {
      console.log('connected')
    })
  },
}
</script>

<style></style>
