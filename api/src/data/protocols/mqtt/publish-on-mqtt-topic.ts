import { Device } from '../../../domain/models/device'

export interface PublishOnMqttTopic {
  publish: (device: Device, data: Record<string, number>) => Promise<void>
}
