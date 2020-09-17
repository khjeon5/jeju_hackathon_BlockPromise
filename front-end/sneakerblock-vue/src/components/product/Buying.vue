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
                  <v-img :src="require(`../../assets/sneakers/${itemInfo.img}`)"></v-img>
                </v-card>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-center">
              <h1 class="mb-3">{{ itemInfo.name }}</h1>
              <h2 class="mb-1">가격: {{ itemInfo.price }} XKRW</h2>
              <h2 class="mb-1">판매자: {{ itemInfo.seller }}</h2>
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
              <h3>내 토큰 잔액 : 0 XKRW</h3>
              <h3>결제 금액 : {{ itemInfo.price }} XKRW</h3>
            </v-col>
            <v-col cols="12">
              <v-row justify="end" class="mx-1">
                <v-btn color="teal darken-3 white--text" @click="signTran">결제</v-btn>
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
import { caver } from '@/klaytn/caver'

export default {
  data() {
    return {
      itemInfo: {},
      myaddress: '0x19687755badea96d0d6f485ad7264a4af56879b9',
      mypriv: '0x186c1d383964f07df3d76421dad200a9e105b3d3599ad9c5fbbf97cb0b260d2c',
      toaddress: '0x8e505cd541178775eabbdaadc9834e3cf7f1a355',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
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
    async signTran() {
      // console.log(this.sendKlay)
      const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction(
        {
          type: 'FEE_DELEGATED_VALUE_TRANSFER',
          from: this.myaddress,
          to: this.toaddress,
          gas: '300000',
          value: caver.utils.toPeb('0.1', 'KLAY'),
        },
        this.mypriv,
      )
      console.log(senderRawTransaction)
      this.$socket.emit('data', senderRawTransaction)
      this.$socket.on('data', function(data) {
        console.log('Received data from server: ' + data)
      })
      this.$socket.on('disconnect', function() {
        console.log('Connection closed')
      })
    },
  },
  created() {
    this.itemDetail()
    this.$socket.on('connect', function() {
      console.log('connected')
    })
  },
}
</script>

<style></style>
