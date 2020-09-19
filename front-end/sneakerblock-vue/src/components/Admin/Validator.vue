<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">검증 페이지</h2>
    </v-col>
    <v-col cols="12">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">유저</th>
              <th class="text-left">제품명</th>
              <th class="text-left">가격</th>
              <th class="text-left">사이즈</th>
              <th class="text-left">검증여부</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allProduct" :key="item._id">
              <td>{{ item.seller }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.size }}</td>
              <td><v-btn color="teal darken-3 white--text" @click="enrollProduct(item)">진품</v-btn></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  name: 'Delivery',
  data() {
    return {
      selected: [],
      enroll: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    async enrollProduct(it) {
      const pr = parseInt(it.price)
      await service.keyringSet(this.userInfo.klayAddress, this.userInfo.klayPrivateKey)
      await service.productEnrollConfirm(this.userInfo.klayAddress, it.seller, pr, it.name, it.size)
      await service.keyringExpire(this.userInfo.klayAddress)
      alert('등록이 되었습니다.')
    },
  },
  async created() {
    //
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
          size
          seller
        }
      }
    `,
  },
}
</script>
