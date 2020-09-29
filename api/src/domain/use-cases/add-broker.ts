import { Broker, Credentials } from '../models/broker'

export interface AddBrokerModel {
  name: string
  userId: string
  credentials: Credentials
}

export interface AddBroker {
  add: (userData: AddBrokerModel) => Promise<Broker>
}
