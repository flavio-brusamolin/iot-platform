import { Action } from '../../domain/enums/action'
import { Device } from '../../domain/models/device'
import { CreateTopicSubscription } from '../../domain/use-cases/mqtt/create-topic-subscription'
import { HandleReceivedData } from '../../domain/use-cases/mqtt/handle-received-data'
import { RemoveTopicSubscription } from '../../domain/use-cases/mqtt/remove-topic-subscription'
import { AsyncHandler, Message } from '../protocols/async-handler'

interface TopicSubscriptionPayload extends Device {
  action: Action
}

export class ProcessTopicSubscriptionHandler implements AsyncHandler {
  public constructor (
    private readonly createTopicSubscription: CreateTopicSubscription,
    private readonly handleReceivedData: HandleReceivedData,
    private readonly removeTopicSubscription: RemoveTopicSubscription
  ) {}

  public async handle ({ content: { action, ...device } }: Message<TopicSubscriptionPayload>): Promise<boolean> {
    try {
      if (action === Action.SUBSCRIBE) {
        const success = await this.createTopicSubscription.createSubscription(device, this.handleReceivedData)
        if (success === null) {
          return false
        }
      }

      if (action === Action.UNSUBSCRIBE) {
        const success = await this.removeTopicSubscription.removeSubscription(device)
        if (success === null) {
          return false
        }
      }

      return true
    } catch (error) {
      console.error(error)
    }
  }
}
