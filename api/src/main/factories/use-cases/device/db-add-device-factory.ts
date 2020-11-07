import { DbAddDevice } from '../../../../data/use-cases/device/db-add-device'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'
import { MessageQueueClient } from '../../../../infra/message-queue/message-queue-client'
import AmqpProvider from '../../../../infra/message-queue/amqp/amqp-provider'

export const makeDbAddDevice = (): DbAddDevice => {
  return new DbAddDevice(new DeviceMongoRepository(), new MessageQueueClient(new AmqpProvider()))
}
