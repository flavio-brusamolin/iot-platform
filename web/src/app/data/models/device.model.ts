import { Protocol } from '../enums'

export interface Device {
  id: string
  collectionId: string
  accessGroupId: string
  name: string
  protocol: Protocol
  mqttInfo?: {
    topic: string
    brokerId: string
  }
}
