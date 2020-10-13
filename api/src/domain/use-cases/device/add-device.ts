import { Protocol } from '../../enums/protocol'
import { Device } from '../../models/device'

export interface AddDeviceModel {
  collectionId: string
  accessGroupId: string
  name: string
  protocol: Protocol
  mqttInfo?: {
    topic: string
    brokerId: string
  }
}

export interface AddDevice {
  add: (deviceData: AddDeviceModel) => Promise<Device>
}
