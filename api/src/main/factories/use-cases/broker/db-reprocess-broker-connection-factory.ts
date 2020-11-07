import { DbReprocessBrokerConnection } from '../../../../data/use-cases/broker/db-reprocess-broker-connection'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'
import { MessageQueueClient } from '../../../../infra/message-queue/message-queue-client'
import AmqpProvider from '../../../../infra/message-queue/amqp/amqp-provider'

export const makeDbReprocessBrokerConnection = (): DbReprocessBrokerConnection => {
  const brokerMongoRepository = new BrokerMongoRepository()
  const messageQueueClient = new MessageQueueClient(new AmqpProvider())
  const deviceMongoRepository = new DeviceMongoRepository()

  return new DbReprocessBrokerConnection(brokerMongoRepository, messageQueueClient, deviceMongoRepository, messageQueueClient)
}
