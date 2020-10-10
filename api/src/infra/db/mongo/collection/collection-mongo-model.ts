import { Document } from 'mongoose'

export interface MongoCollection extends Document {
  _id: any
  accessGroupId: any
  name: string
}
