import { Device } from '../../../../domain/models/device'

export interface LoadDeviceByIdRepository {
  loadById: (deviceId: string) => Promise<Device>
}
