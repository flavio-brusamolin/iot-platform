import { Schema, model } from 'mongoose'
import { MongoCollection } from './collection-mongo-model'

const CollectionMongoSchema = new Schema({
  accessGroupId: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

export default model<MongoCollection>('collections', CollectionMongoSchema)
