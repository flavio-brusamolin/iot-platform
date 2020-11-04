import { DbAddBroker } from '../../../../data/use-cases/broker/db-add-broker'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { RabbitAdapter } from '../../../../infra/message-queue/rabbit/rabbit-adapter'

export const makeDbAddBroker = (): DbAddBroker => {
  return new DbAddBroker(new BrokerMongoRepository(), new RabbitAdapter())
}
