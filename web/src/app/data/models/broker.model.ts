import { BrokerStatus } from '../enums'

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
