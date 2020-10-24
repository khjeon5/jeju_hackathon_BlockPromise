<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <h2>All Sneakers</h2>
      </v-row>
    </v-col>
    <v-col v-for="product in allProductsList" :key="product[0]" cols="6" xs="6" sm="6" md="3" lg="3">
      <v-row justify="center" class="mx-1">
        <v-card color="grey lighten-3" class="max-auto" @click="$router.push({ name: 'Item', params: { id: product[0] } })" style="cursor:pointer" flat>
          <v-container class="mt-3">
            <v-img :src="require(`@/assets/sneakers/${product[0]}.jpg`)"></v-img>
          </v-container>
          <div class="ml-3 mr-3">
            <h4 class="text-center mt-3 text-truncate">{{ product[2] }}</h4>
          </div>
          <h4 class="text-center mb-3">₩ {{ product[1] }}</h4>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  name: 'productAllList',
  data() {
    return {
      show: false,
      allProductsList: [],
    }
  },
  methods: {
    async allProducts() {
      this.allProductsList = await service.saleProducts()
    },
  },
  async created() {
    this.allProducts()
  },
  apollo: {
    allProduct: gql`
      query {
        allProduct {
          _id
          name
          price
          img
          tokenID
        }
      }
    `,
  },
}
</script>

<style></style>
