import { Document } from 'mongoose'

export interface MongoBroker extends Document {
  _id: any
  userId: any
  name: string
  status: string
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}
