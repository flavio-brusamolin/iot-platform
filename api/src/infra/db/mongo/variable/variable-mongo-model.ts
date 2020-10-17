import { Document } from 'mongoose'

interface MongoData {
  timestamp: Date
  value: string
}

export interface MongoVariable extends Document {
  _id: any
  deviceId: any
  accessGroupId: any
  name: string
  key: string
  data?: MongoData[]
}
