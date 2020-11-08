import { DbUpdateDevice } from '../../../../data/use-cases/device/db-update-device'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'
import AmqpProvider from '../../../../infra/message-queue/amqp/amqp-provider'
import { MessageQueueClient } from '../../../../infra/message-queue/message-queue-client'

export const makeDbUpdateDevice = (): DbUpdateDevice => {
  return new DbUpdateDevice(
    new DeviceMongoRepository(),
    new DeviceMongoRepository(),
    new MessageQueueClient(new AmqpProvider()),
    new BrokerMongoRepository(),
    new DeviceMongoRepository(),
    new BrokerMongoRepository(),
    new MessageQueueClient(new AmqpProvider())
  )
}
