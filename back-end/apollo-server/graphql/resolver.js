//var User = require('../sneakers/User');
import Product from '../sneakers/Product'
import User from '../sneakers/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const ACCESS_TOKEN_SECRET = 'asdasdasd'

const resolvers = {
  Query: {
    hello(root, args, context) {
      return 'hello apollo-server-express!!!'
    },
    async emailVerify(root, { email }) {
      if ((await User.findOne({ email })) === null) {
        return true
      } else {
        return false
      }
      // return await User.findOne({ email })
    },
    async allUsers() {
      const a = await User.find({ email: 'khjeon5328@naver.com' })
      console.log(a)
      return await User.find()
    },
    async getUser(root, { _id }) {
      return await User.findById(_id)
    },
    async allProduct() {
      return await Product.find()
    },
    async getProduct() {
      return await Product.findById(_id)
    },
    async itemDetail(root, {tokenID}) {
      return await Product.findOne({tokenID: tokenID})
    }
  },
  Mutation: {
    async productEnroll(root, { input }) {
      return await Product.create(input)
    },
    async signUp(root, { input }) {
      return await User.create(input)
    },
    async signIn(root, { input }) {
      // console.log(input)
      // const email = input.email
      const userinter = await User.findOne({ email: input.email, password: input.password })
      // const token = jwt.sign({ email }, ACCESS_TOKEN_SECRET)
      const userObj = userinter.toObject()
      const tokenInfo = { _id: userObj._id, email: userObj.email, name: userObj.name, homeAddress: userObj.homeAddress, klayAddress: userObj.klayAddress }
      const token = jwt.sign(tokenInfo, ACCESS_TOKEN_SECRET)
      // let correctUser = {}
      // const userinter = await User.find({"email": input.email})
      // userinter.toObject()
      // console.log(userinter)
      if (userinter !== null) {
        return { token }
      } else {
        return null
      }
    },
    async createUser(root, { input }) {
      return await User.create(input)
    },
    async updateUser(root, { _id, input }) {
      return await User.findOneAndUpdate({ _id }, input, { new: true })
    },
    async deleteUser(root, { _id }) {
      return await User.findOneAndDelete({ _id })
    },
    async createProduct(root, { input }) {
      return await Product.create(input)
    },
    async updateProduct(root, { _id, input }) {
      return await Product.findOneAndUpdate({ _id }, input, { new: true })
    },
    async deleteProduct(root, { _id }) {
      return await Product.findOneAndDelete({ _id })
    },
    async login(_, { email, password }) {
      console.log(email)
      console.log(password)
      var correctUser = {}
      await User.find({}, (err, users) => {
        users.forEach((user) => {
          if (user.email === email && user.password === password) {
            correctUser = user
          } else {
            correctUser = 'null'
          }
        })
      })
      // console.log(correctUser)
      return correctUser
    },
  },
}
export default resolvers
