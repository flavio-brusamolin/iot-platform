import { Protocol } from '../enums'

export interface DeviceUpdation {
  name?: string,
  protocol?: Protocol,
  mqttInfo?: {
    topic: string,
    brokerId: string
  }
}
