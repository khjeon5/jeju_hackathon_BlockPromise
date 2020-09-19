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
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>검증중</td>
              <td>50000</td>
              <td>250</td>
              <td><v-btn color="teal darken-3 white--text" @click="enrollProduct(item)">진품</v-btn></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<script>
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  name: 'Delivery',
  data() {
    return {
      selected: [],
      desserts: [
        {
          name: '지드래곤에디션',
          calories: 'ㅁㄴㅇㅁ',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
      ],
      enroll: '',
    }
  },
  computed: {
    //
  },
  methods: {
    async enrollProduct(index) {
      console.log(index)
      console.log('service: ', service)
    },
  },
  async created() {
    //
  },
}
</script>
