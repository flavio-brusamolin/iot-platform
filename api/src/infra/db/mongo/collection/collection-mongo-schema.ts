import { Schema, model } from 'mongoose'

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

export default model('collections', CollectionMongoSchema)
