import { BrokerStatus } from '../enums/broker-status'

export interface Broker {
  id: string
  userId: string
  name: string
  status: BrokerStatus
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}
