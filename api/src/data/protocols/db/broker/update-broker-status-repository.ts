import { BrokerStatus } from '../../../../domain/enums/broker-status'
import { Broker } from '../../../../domain/models/broker'

export interface UpdateBrokerStatusRepository {
  updateStatus: (brokerId: string, status: BrokerStatus) => Promise<Broker>
}
