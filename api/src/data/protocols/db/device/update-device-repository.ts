import { Device } from '../../../../domain/models/device'

export interface UpdateDeviceRepository {
  update: (deviceId: string, newDevice: Device) => Promise<Device>
}
