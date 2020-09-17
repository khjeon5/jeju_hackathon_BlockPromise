import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String
  },
  klayAddress: {
    type: String
  },
  klayPrivateKey: {
    type: String
  },
  likeProducts: {
    type: Array,
    required: false
  },
  isAdmin: {
    type: Boolean
  },
})

export default mongoose.model('users', UserSchema)
