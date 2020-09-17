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
        <v-btn @click="tokenList">dsds</v-btn>
        <h4 class="mb-3">보유 토큰</h4>
        <v-text-field :value="token + ' XKRW'" label="Token" outlined readonly></v-text-field>
        <h4 class="mb-3">보유 스니커즈</h4>

        <v-row justify="center" class="mx-1">
          <v-col v-for="tok in token" :key="tok" cols="6">
            <ApolloQuery :query="require('@/graphql/itemWallet.gql')" :variables="{ tokenID: tok }">
              <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                <div v-else-if="error" class="error apollo">An error occurred</div>
                <div v-else-if="data" class="result apollo">
                  <v-card color="grey lighten-3" class="max-auto" @click="$router.push({ name: 'Item', params: { id: tok } })" style="cursor:pointer" flat>
                    <v-container class="mt-3">
                      <v-img :src="require(`@/assets/sneakers/${data.itemDetail.img}`)"></v-img>
                    </v-container>
                    <h4 class="text-center mt-3">{{ data.itemDetail.name }}</h4>
                    <h3 class="text-center mb-3">₩ {{ data.itemDetail.price }}</h3>
                    <!-- <h3 class="text-center mb-3">{{ data.itemDetail.tokenID }}</h3> -->
                    <!-- {{ data.itemDetail }} -->
                  </v-card>
                </div>
                <div v-else class="no-result apollo">No result :(</div>
              </template>
            </ApolloQuery>

            <!-- <v-card color="grey lighten-3" class="max-auto" @click="$router.push({ name: 'Item' })" style="cursor:pointer" flat>
              <v-container class="mt-3">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
              </v-container>
              <h3 class="text-center mt-3">모델명 {{ n }}</h3>
              <h2 class="text-center mb-3">₩ 300,000</h2>
            </v-card> -->
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

export default {
  data() {
    return {
      address: '0x54dff6c456a84b2e35a454dff6c456a84b2e35a4',
      token: [],
      itemInfo: [],
      tokenCount: 0,
      ccc: 0,
      sneakers: [
        {
          asd: 'asd',
          ggg: 'ggg',
        },
        {
          asd: 'asd211',
          ggg: 'ggg222',
        },
      ],
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
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
    tokenli() {
      console.log(this.token[0])
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
  created() {
    this.getToken17()
    // console.log('this.token.length: ', this.token)

    this.tokenList()
    // console.log(this.itemInfo)
  },
  beforeCreate() {},
}
</script>

<style></style>
