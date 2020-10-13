import { Protocol } from '../enums/protocol'

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
