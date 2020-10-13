import { Broker } from '../../../../domain/models/broker'

export interface LoadBrokerByIdRepository {
  loadById: (id: string) => Promise<Broker>
}
