import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: String
  },
  img: {
    type: String
  },
  seller: {
    type: String,
  },
  brand: {
    type: String
  },
  size: {
    type: String
  },
  serial: {
    type: String
  },
  description: {
    type: String,
  },
  validator: {
    type: String
  },
  tokenID: {
    type: Number
  },
  likeNum: {
    type: Number
  },
  isSell: {
    type: Boolean
  },
  buyer: {
    type: String
  }
})

export default mongoose.model('product', ProductSchema)
