import { Protocol } from '../../enums/protocol'
import { Device } from '../../models/device'

export interface UpdateDeviceModel {
  name?: string
  protocol?: Protocol
  mqttInfo?: {
    topic: string
    brokerId: string
  }
}

export interface UpdateDevice {
  update: (deviceId: string, deviceData: UpdateDeviceModel) => Promise<Device>
}
