import { Device } from '../../../domain/models/device'
import { HandleReceivedData } from '../../../domain/use-cases/mqtt/handle-received-data'

export interface SubscribeMqttTopic {
  subscribe: (device: Device, handleReceivedData: HandleReceivedData) => Promise<void>
}
