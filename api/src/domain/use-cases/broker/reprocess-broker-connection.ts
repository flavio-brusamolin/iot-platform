import { Broker } from '../../models/broker'

export interface ReprocessBrokerConnection {
  reprocess: (broker: Broker) => Promise<Broker>
}
