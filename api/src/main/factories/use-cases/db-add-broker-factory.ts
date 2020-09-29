import { DbAddBroker } from '../../../data/use-cases/db-add-broker'
import { BrokerMongoRepository } from '../../../infra/db/mongo/broker/broker-mongo-repository'

export const makeDbAddBroker = (): DbAddBroker => {
  const brokerMongoRepository = new BrokerMongoRepository()

  return new DbAddBroker(brokerMongoRepository)
}
