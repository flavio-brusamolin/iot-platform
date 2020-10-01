import { Broker } from '../../models/broker'

export interface LoadBrokers {
  load: (userId: string) => Promise<Broker[]>
}
