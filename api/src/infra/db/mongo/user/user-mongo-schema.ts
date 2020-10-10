import { Schema, model } from 'mongoose'
import { MongoUser } from './user-mongo-model'

const UserMongoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model<MongoUser>('users', UserMongoSchema)
