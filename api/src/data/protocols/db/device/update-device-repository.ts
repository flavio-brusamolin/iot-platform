import { UpdateDeviceModel } from '../../../../domain/use-cases/device/update-device'
import { Device } from '../../../../domain/models/device'

export interface UpdateDeviceRepository {
  update: (deviceId: string, deviceData: UpdateDeviceModel) => Promise<Device>
}
