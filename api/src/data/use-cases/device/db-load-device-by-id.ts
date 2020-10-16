import { Device } from '../../../domain/models/device'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { LoadDeviceByIdRepository } from '../../protocols/db/device/load-device-by-id-repository'

export class DbLoadDeviceById implements LoadDeviceById {
  public constructor (private readonly loadDeviceById: LoadDeviceByIdRepository) {}

  public async load (deviceId: string): Promise<Device> {
    return await this.loadDeviceById.loadById(deviceId)
  }
}
