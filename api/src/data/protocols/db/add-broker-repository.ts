import { AddBrokerModel } from '../../../domain/use-cases/add-broker'
import { Broker } from '../../../domain/models/broker'

export interface AddBrokerRepository {
  add: (brokerData: AddBrokerModel) => Promise<Broker>
}
