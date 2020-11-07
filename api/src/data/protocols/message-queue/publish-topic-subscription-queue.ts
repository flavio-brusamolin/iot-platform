import { Action } from '../../../domain/enums/action'
import { Device } from '../../../domain/models/device'

export interface PublishTopicSubscriptionQueue {
  publishTopicSubscription: (device: Device, action: Action) => void
}
