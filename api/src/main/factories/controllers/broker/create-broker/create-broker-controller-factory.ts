import { CreateBrokerController } from '../../../../../presentation/controllers/broker/create-broker-controller'
import { makeCreateBrokerValidator } from './create-broker-validator-factory'
import { makeDbAddBroker } from '../../../use-cases/broker/db-add-broker-factory'

export const makeCreateBrokerController = (): CreateBrokerController => {
  return new CreateBrokerController(makeCreateBrokerValidator(), makeDbAddBroker())
}
