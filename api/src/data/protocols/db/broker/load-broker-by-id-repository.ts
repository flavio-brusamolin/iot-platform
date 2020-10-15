import { Broker } from '../../../../domain/models/broker'

export interface LoadBrokerByIdRepository {
  loadById: (brokerId: string) => Promise<Broker>
}
