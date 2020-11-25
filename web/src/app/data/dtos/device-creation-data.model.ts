import { Protocol } from '../enums'

export interface DeviceCreation {
  name: string,
  protocol: Protocol,
  mqttInfo: {
    topic: string,
    brokerId: string
  }
}
