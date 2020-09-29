import { DbAddBroker } from '../../../data/use-cases/db-add-broker'
import { BrokerMongoRepository } from '../../../infra/db/mongoose/broker/broker-mongo-repository'

export const makeDbCreateUser = (): DbAddBroker => {
  const brokerMongoRepository = new BrokerMongoRepository()

  return new DbAddBroker(brokerMongoRepository)
}
