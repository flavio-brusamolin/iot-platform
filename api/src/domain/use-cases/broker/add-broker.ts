import { Broker } from '../../models/broker'

export interface AddBrokerModel {
  userId: string
  name: string
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}

export interface AddBroker {
  add: (brokerData: AddBrokerModel) => Promise<Broker>
}
