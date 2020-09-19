<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">
        지갑
      </h2>
    </v-col>
    <v-col cols="12">
      <v-card max-width="400" class="mx-auto" flat>
        <h4 class="mb-3">내 지갑 주소</h4>
        <v-text-field :value="userInfo.klayAddress" label="Address" outlined readonly></v-text-field>
        <h4 class="mb-3">보유 토큰</h4>
        <v-text-field :value="token7Balance + ' XKRW'" label="Token" outlined readonly></v-text-field>
        <h4 class="mb-3">보유 스니커즈</h4>
        <v-row justify="center" class="mx-1">
          <v-col v-for="sneaker in sneakers" :key="sneaker[0]" cols="6">
            <v-row justify="center" class="mx-1">
              <v-card color="grey lighten-3" class="max-auto" @click="$router.push({ name: 'Item', params: { id: sneaker[0] } })" style="cursor:pointer" flat>
                <v-container class="mt-3">
                  <v-img :src="require(`@/assets/sneakers/${sneaker[0]}.jpg`)"></v-img>
                </v-container>
                <h6 class="text-center mt-3">고유번호: {{ sneaker[0] }}</h6>
                <h4 class="text-center mt-3">{{ sneaker[2] }}</h4>
                <h4 class="text-center mt-3">판매여부: {{ selling(sneaker[4]) }}</h4>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { caver } from '@/klaytn/caver.js'
const kip17Instance = new caver.klay.KIP17('0x0F3c4462f1c977dF3991e85b7913daF2A130c614')
import ITEMDETAIL from '@/graphql/itemDetail.gql'
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  data() {
    return {
      address: '',
      token7Balance: 0,
      sneakers: [],
      token: [],
      itemInfo: [],
      tokenCount: 0,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    async getMyToken7() {
      this.token7Balance = await service.getKIP7Balance(this.userInfo.klayAddress)
    },
    async getMyToken17() {
      this.sneakers = await service.getMySneakersList(this.userInfo.klayAddress)
    },
    selling(a) {
      if (a === true) {
        return '판매중'
      } else {
        return '안판매중'
      }
    },
    getToken17() {
      kip17Instance.balanceOf(this.userInfo.klayAddress).then(res => {
        this.tokenCount = parseInt(res, 10)
        for (let i = 0; i < res; i++) {
          kip17Instance.tokenOfOwnerByIndex(this.userInfo.klayAddress, i).then(res => {
            this.token.push(res.c[0])
          })
        }
      })
    },
    tokenList() {
      for (let i = 0; i < this.tokenCount; i++) {
        this.$apollo
          .query({
            query: ITEMDETAIL,
            variables: {
              tokenID: parseInt(this.token[i], 10),
            },
          })
          .then(result => {
            console.log(result)
            this.itemInfo = result.data.itemDetail
          })
      }
    },
  },
  async created() {
    this.getMyToken7()
    this.getMyToken17()
  },
}
</script>

<style></style>
