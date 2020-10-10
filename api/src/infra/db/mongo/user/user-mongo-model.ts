import { Document } from 'mongoose'

export interface MongoUser extends Document {
  _id: any
  name: string
  email: string
  password: string
}
