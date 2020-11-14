import { MqttInitializeConnections } from '../../../../data/use-cases/mqtt/mqtt-initialize-connections'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MessageQueueClient } from '../../../../infra/message-queue/message-queue-client'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'
import AmqpProvider from '../../../../infra/message-queue/amqp/amqp-provider'

export const makeMqttInitializeConnections = (): MqttInitializeConnections => {
  const brokerMongoRepository = new BrokerMongoRepository()
  const messageQueueClient = new MessageQueueClient(new AmqpProvider())
  const deviceMongoRepository = new DeviceMongoRepository()

  return new MqttInitializeConnections(
    brokerMongoRepository,
    brokerMongoRepository,
    messageQueueClient,
    deviceMongoRepository,
    messageQueueClient
  )
}
