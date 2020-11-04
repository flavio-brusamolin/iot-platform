import { Schema, model } from 'mongoose'
import { MongoVariable } from './variable-mongo-model'

const DataSchema = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { _id: false })

const VariableMongoSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'devices',
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
  key: {
    type: String,
    required: true
  },
  data: [DataSchema]
})

export default model<MongoVariable>('variables', VariableMongoSchema)
