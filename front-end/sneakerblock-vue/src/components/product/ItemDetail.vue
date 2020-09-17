<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">{{ itemInfo.name }}</h2>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
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
            <v-col cols="12">
              <v-row justify="center" class="mx-1">
                <v-btn v-if="!favoriteheart" class="mt-3 mb-9" outlined color="teal darken-3 white--text" @click="favoriteclick">
                  <span>Favorite</span>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-else class="mt-3 mb-9" color="teal darken-3 white--text" @click="favoriteclick">
                  <span>Favorite</span>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-row>
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
              <h1 class="mb-3">{{ itemInfo.name }}</h1>
              <h2 class="mb-1">가격: {{ itemInfo.price }} XKRW</h2>
              <h2 class="mb-1">판매자: {{ itemInfo.seller }}</h2>
              <h2>토큰 아이디: {{ itemInfo.tokenID }}</h2>
            </v-col>
            <v-col cols="12">
              <h2 class="mb-3">제품 정보</h2>
              <h3>브랜드: {{ itemInfo.brand }}</h3>
              <h3>사이즈: {{ itemInfo.size }}</h3>
              <h3>검증자: {{ itemInfo.validator }}</h3>
            </v-col>
            <v-col cols="12">
              <h2 class="mb-2">제품 설명</h2>
              <v-textarea name="input-7-1" label="제품 설명" auto-grow :value="itemInfo.description" readonly></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-row justify="end" class="mx-1">
                <v-btn color="teal darken-3 white--text" @click="$router.push({ name: 'ItemBuy', params: { id: itemInfo.tokenID } })">구매하기</v-btn>
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

export default {
  data() {
    return {
      favoriteheart: false,
      itemInfo: {},
    }
  },
  methods: {
    favoriteclick() {
      this.favoriteheart = !this.favoriteheart
      // console.log(this.itemInfo)
    },
    getItemDetail() {
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
  computed: {
    ...mapState(['userInfo']),
  },
  created() {
    this.getItemDetail()
  },
}
</script>

<style></style>
