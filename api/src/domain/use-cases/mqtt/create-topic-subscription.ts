import { Device } from '../../models/device'
import { HandleReceivedData } from './handle-received-data'

export interface CreateTopicSubscription {
  createSubscription: (device: Device, handleReceivedData: HandleReceivedData) => Promise<void>
}
