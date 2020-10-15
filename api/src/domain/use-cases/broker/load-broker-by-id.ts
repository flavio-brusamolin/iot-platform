import { Broker } from '../../models/broker'

export interface LoadBrokerById {
  load: (brokerId: string, userId: string) => Promise<Broker>
}
