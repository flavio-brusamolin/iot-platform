import { Schema, model } from 'mongoose'
import { Protocol } from '../../../../domain/enums/protocol'
import { MongoDevice } from './device-mongo-model'

const DeviceMongoSchema = new Schema({
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'collections',
    required: true
  },
  accessGroupId: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  protocol: {
    type: String,
    required: true,
    enum: Object.values(Protocol)
  },
  mqttInfo: {
    topic: {
      type: String,
      required: true
    },
    brokerId: {
      type: Schema.Types.ObjectId,
      ref: 'brokers',
      required: true
    }
  }
})

export default model<MongoDevice>('devices', DeviceMongoSchema)
