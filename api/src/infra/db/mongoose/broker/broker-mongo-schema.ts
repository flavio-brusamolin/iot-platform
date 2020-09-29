import { Schema, model } from 'mongoose'

const BrokerMongoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  credentials: {
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    port: {
      type: String,
      required: true
    }
  }
})

export default model('brokers', BrokerMongoSchema)
