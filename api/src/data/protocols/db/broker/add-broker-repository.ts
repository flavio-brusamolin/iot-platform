import { AddBrokerModel } from '../../../../domain/use-cases/broker/add-broker'
import { Broker } from '../../../../domain/models/broker'

export interface AddBrokerRepository {
  add: (brokerData: AddBrokerModel) => Promise<Broker>
}
