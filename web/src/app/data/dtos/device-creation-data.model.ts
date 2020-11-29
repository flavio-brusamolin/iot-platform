import { Protocol } from '../enums'

export interface DeviceCreationData {
  name: string,
  protocol: Protocol,
  mqttInfo?: {
    topic: string,
    brokerId: string
  }
}
