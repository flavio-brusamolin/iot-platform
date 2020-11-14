import { BrokerStatus } from '../../../../domain/enums/broker-status'
import { Broker } from '../../../../domain/models/broker'

export interface LoadBrokersByStatusRepository {
  loadByStatus: (status: BrokerStatus) => Promise<Broker[]>
}
