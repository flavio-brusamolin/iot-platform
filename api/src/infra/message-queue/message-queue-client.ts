import { MessageQueueProvider } from './protocols/message-queue-provider'
import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'
import { PublishBrokerConnectionQueue } from '../../data/protocols/message-queue/publish-broker-connection-queue'
import { PublishTopicSubscriptionQueue } from '../../data/protocols/message-queue/publish-topic-subscription-queue'
import { Device } from '../../domain/models/device'

export class MessageQueueClient implements PublishBrokerConnectionQueue, PublishTopicSubscriptionQueue {
  public constructor (private readonly messageQueueProvider: MessageQueueProvider) {}

  public publishBrokerConnection (broker: Broker, action: Action): void {
    this.messageQueueProvider.publish('broker-connection', { ...broker, action })
  }

  public publishTopicSubscription (device: Device, action: Action): void {
    this.messageQueueProvider.publish('topic-subscription', { ...device, action })
  }
}
