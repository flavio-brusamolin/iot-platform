import { Action } from '../../domain/enums/action'
import { Device } from '../../domain/models/device'
import { AsyncHandler, Message } from '../protocols/async-handler'

interface TopicSubscriptionPayload extends Device {
  action: Action
}

export class ProcessTopicSubscriptionHandler implements AsyncHandler {
  public async handle ({ content }: Message<TopicSubscriptionPayload>): Promise<void> {
    console.log('Processing topic subscription...', content)
  }
}
