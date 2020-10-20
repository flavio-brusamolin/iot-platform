import { Device } from '../../../domain/models/device'
import { UpdateDevice, UpdateDeviceModel } from '../../../domain/use-cases/device/update-device'
import { UpdateDeviceRepository } from '../../protocols/db/device/update-device-repository'

export class DbUpdateDevice implements UpdateDevice {
  public constructor (private readonly updateDeviceRepository: UpdateDeviceRepository) {}

  public async update (deviceId: string, deviceData: UpdateDeviceModel): Promise<Device> {
    return await this.updateDeviceRepository.update(deviceId, deviceData)
  }
}
