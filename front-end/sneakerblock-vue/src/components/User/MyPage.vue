<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">마이 페이지</h2>
    </v-col>
    <v-col cols="12">
      <h3 class="text-center">결제된 제품들</h3>
    </v-col>
    <v-col cols="12">
      <v-card max-width="500" class="mx-auto" flat>
        <v-simple-table height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">고유번호</th>
                <th class="text-center">판매제품</th>
                <th class="text-center">판매확정</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paidItems" :key="item[0]">
                <td class="text-center">{{ item[0] }}</td>
                <td class="text-center">{{ item[2] }}</td>
                <td class="text-center">
                  <v-btn color="success" @click="confirm(item[0])">확정</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12">
      <h3 class="text-center">회원 정보</h3>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-card max-width="400" class="mx-auto" flat>
        <p>이메일: {{ userInfo.email }}</p>
        <p>이름: {{ userInfo.name }}</p>
        <p>유저유형: {{ userinfo.type }}</p>
        <p>배송지: {{ userInfo.homeAddress }}</p>
        <div class="text-right mt-12 mb-12"></div>
      </v-card>
    </v-col>
    {{ paidItems }}
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import klaytnService from '@/klaytn/klaytnService'
const service = new klaytnService()

export default {
  data() {
    return {
      userinfo: {
        type: '일반',
      },
      paidItems: '',
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  async created() {
    this.paidItems = await service.paidSneakers(this.userInfo.klayAddress)
  },
  methods: {
    async confirm(tokenId) {
      await service.keyringSet(this.userInfo.klayAddress, this.userInfo.klayPrivateKey)
      await service.tradeConfirm(tokenId, this.userInfo.klayAddress)
      await service.keyringExpire(this.userInfo.klayAddress)
    },
    changeUserType() {
      this.userinfo.type = '검증자'
    },
  },
}
</script>

<style></style>
