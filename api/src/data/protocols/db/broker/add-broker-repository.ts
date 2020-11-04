import { BrokerStatus } from '../../../../domain/enums/broker-status'
import { Broker } from '../../../../domain/models/broker'
import { AddBrokerModel } from '../../../../domain/use-cases/broker/add-broker'

export interface AddBrokerRepositoryModel extends AddBrokerModel {
  userId: string
  name: string
  status: BrokerStatus
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}

export interface AddBrokerRepository {
  add: (brokerData: AddBrokerRepositoryModel) => Promise<Broker>
}
