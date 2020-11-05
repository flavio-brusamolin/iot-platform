import AmqpProvider from './amqp/amqp-provider'
import { PublishBrokerConnectionQueue } from '../../data/protocols/message-queue/publish-broker-connection-queue'
import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'

export class MessageQueueClient implements PublishBrokerConnectionQueue {
  public publishBrokerConnection (broker: Broker, action: Action): void {
    const amqpProvider = AmqpProvider.getInstance()
    amqpProvider.publish('broker-connection', { ...broker, action })
  }
}
