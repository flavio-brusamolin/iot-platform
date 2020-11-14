import { Device } from '../../../domain/models/device'

export interface UnsubscribeMqttTopic {
  unsubscribe: (device: Device) => Promise<void>
}
