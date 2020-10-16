import { Device } from '../../../domain/models/device'
import { UpdateDevice } from '../../../domain/use-cases/device/update-device'
import { UpdateDeviceRepository } from '../../protocols/db/device/update-device-repository'

export class DbUpdateDevice implements UpdateDevice {
  public constructor (private readonly updateDevice: UpdateDeviceRepository) {}

  public async update (deviceId: string, request: any): Promise<Device> {
    return await this.updateDevice.update(deviceId, request)
  }
}
