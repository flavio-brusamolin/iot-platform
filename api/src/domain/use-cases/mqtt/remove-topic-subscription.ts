import { Device } from '../../models/device'

export interface RemoveTopicSubscription {
  removeSubscription: (device: Device) => Promise<void>
}
