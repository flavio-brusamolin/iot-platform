import { DbAddBroker } from '../../../../data/use-cases/broker/db-add-broker'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MessageQueueClient } from '../../../../infra/message-queue/message-queue-client'

export const makeDbAddBroker = (): DbAddBroker => {
  return new DbAddBroker(new BrokerMongoRepository(), new MessageQueueClient())
}
