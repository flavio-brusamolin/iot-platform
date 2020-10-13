import { AddDevice, AddDeviceModel } from '../../../domain/use-cases/device/add-device'
import { Device } from '../../../domain/models/device'
import { AddDeviceRepository } from '../../protocols/db/device/add-device-repository'

export class DbAddDevice implements AddDevice {
  public constructor (private readonly addDeviceRepository: AddDeviceRepository) {}

  public async add (deviceData: AddDeviceModel): Promise<Device> {
    return await this.addDeviceRepository.add(deviceData)
  }
}
