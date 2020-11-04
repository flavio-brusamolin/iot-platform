import { Document } from 'mongoose'
import { BrokerStatus } from '../../../../domain/enums/broker-status'

export interface MongoBroker extends Document {
  _id: any
  userId: any
  name: string
  status: BrokerStatus
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}
