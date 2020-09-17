import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

// import wallet from '@/store/modules/wallet'
import { caver } from '@/klaytn/caver'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signUpcount: 0,
    signupBarPC: 33,
    accessToken: null,
    signUpName: '',
    isLogin: false,

    userEmail: '',
    userPassword: '',
    userName: '',
    userHomeAddress: '',
    userKlayAddress: '',
    userKlayPrivateKey: '',

    userInfo: null,
  },
  getters: {
    //
  },
  mutations: {
    init: state => {
      state.signUpcount = 0
      state.signupBarPC = 33
    },
    next: state => {
      state.signUpcount = 1
      state.signupBarPC = 66
    },
    before: state => {
      state.signUpcount = 0
      state.signupBarPC = 33
    },
    join: state => {
      state.signUpcount = 2
      state.signupBarPC = 100
      state.userEmail = ''
      state.userPassword = ''
      state.userName = ''
      state.userHomeAddress = ''
      state.userKlayAddress = ''
      state.userKlayPrivateKey = ''
    },
    toSignin: state => {
      state.signUpcount = 0
      state.signupBarPC = 33
      state.signUpName = null
    },
    async createAccount(state) {
      const acc = await caver.klay.accounts.create()
      state.userKlayAddress = acc.address
      state.userKlayPrivateKey = acc.privateKey
    },
    signOut: state => {
      state.isLogin = false
      state.accessToken = null
      state.userInfo = null
      localStorage.removeItem('access-token')
    },
    tokenSave: state => {
      localStorage.setItem('access-token', state.accessToken)
      state.userInfo = jwt.decode(state.accessToken)
    },
    getStorageToken: state => {
      state.accessToken = localStorage.getItem('access-token')
      if (state.accessToken !== null) state.isLogin = true
      state.userInfo = jwt.decode(state.accessToken)
    },
  },
  actions: {
    tokenSearch({ commit }) {
      commit('getStorageToken')
    },
  },
  modules: {
    // wallet,
  },
})
