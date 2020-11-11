import { Broker } from '../../models/broker'

export interface KillBrokerConnection {
  killConnection: (broker: Broker) => Promise<void>
}
