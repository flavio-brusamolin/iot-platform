import { Broker } from '../../models/broker'

export interface LoadBrokerById {
  load: (id: string) => Promise<Broker>
}
