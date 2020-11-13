import { Broker } from '../../models/broker'

export interface EstablishBrokerConnection {
  establishConnection: (broker: Broker) => Promise<void>
}
