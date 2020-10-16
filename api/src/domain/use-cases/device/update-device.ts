import { Device } from '../../models/device'

export interface UpdateDevice {
  update: (deviceId: string, request: any) => Promise<Device>
}
