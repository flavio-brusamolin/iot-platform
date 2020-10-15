import { Device } from '../../../domain/models/device'
import { LoadDevices } from '../../../domain/use-cases/device/load-devices'
import { LoadDevicesRepository } from '../../protocols/db/device/load-devices-repository'

export class DbLoadDevices implements LoadDevices {
  public constructor (private readonly loadDevicesRepository: LoadDevicesRepository) {}

  public async load (collectionId: string): Promise<Device[]> {
    return await this.loadDevicesRepository.load(collectionId)
  }
}
