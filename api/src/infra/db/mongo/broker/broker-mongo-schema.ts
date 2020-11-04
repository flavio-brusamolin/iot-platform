import { Schema, model } from 'mongoose'
import { BrokerStatus } from '../../../../domain/enums/broker-status'
import { MongoBroker } from './broker-mongo-model'

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
  status: {
    type: String,
    required: true,
    enum: Object.values(BrokerStatus)
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

export default model<MongoBroker>('brokers', BrokerMongoSchema)
