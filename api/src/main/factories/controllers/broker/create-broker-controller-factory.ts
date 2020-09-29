import { CreateBrokerController } from '../../../../presentation/controllers/broker/create-broker-controller'
import { makeDbCreateUser } from '../../use-cases/create-broker-factory'
import { makeCreateBrokerValidator } from './create-broker-validator-factory'

export const makeCreateBrokerController = (): CreateBrokerController => {
  return new CreateBrokerController(makeCreateBrokerValidator(), makeDbCreateUser())
}
