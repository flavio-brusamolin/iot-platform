import { AddDeviceModel } from '../../../../domain/use-cases/device/add-device'
import { Device } from '../../../../domain/models/device'

export interface AddDeviceRepository {
  add: (deviceData: AddDeviceModel) => Promise<Device>
}
