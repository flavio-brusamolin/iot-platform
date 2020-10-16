import { Device } from '../../models/device'

export interface LoadDeviceById {
  load: (deviceId: string) => Promise<Device>
}
