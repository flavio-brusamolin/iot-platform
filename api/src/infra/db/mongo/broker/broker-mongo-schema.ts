import { Schema, model } from 'mongoose'

const BrokerMongoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  credentials: {
    username: {
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
      type: Number,
      required: true
    }
  }
})

export default model('brokers', BrokerMongoSchema)
