import { PublishBrokerConnectionQueue } from '../../data/protocols/message-queue/publish-broker-connection-queue'
import { MessageQueueProvider } from './protocols/message-queue-provider'
import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'

export class MessageQueueClient implements PublishBrokerConnectionQueue {
  public constructor (private readonly messageQueueProvider: MessageQueueProvider) {}

  public publishBrokerConnection (broker: Broker, action: Action): void {
    this.messageQueueProvider.publish('broker-connection', { ...broker, action })
  }
}
