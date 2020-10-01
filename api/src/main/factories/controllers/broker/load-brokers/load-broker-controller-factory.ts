import { CreateBrokerController } from '../../../../../presentation/controllers/broker/create-broker-controller'
import { LoadBrokersController } from '../../../../../presentation/controllers/broker/load-brokers-controller'
import { makeDbLoadBrokers } from '../../../use-cases/broker/db-load-brokers-factory'

export const makeLoadBrokersController = (): LoadBrokersController => {
  return new LoadBrokersController(makeDbLoadBrokers())
}
