import DeviceMongoSchema from './device-mongo-schema'
import DeviceMongoMapper from './device-mongo-mapper'
import { Device } from '../../../../domain/models/device'
import { AddDeviceModel } from '../../../../domain/use-cases/device/add-device'
import { AddDeviceRepository } from '../../../../data/protocols/db/device/add-device-repository'
import { LoadDevicesRepository } from '../../../../data/protocols/db/device/load-devices-repository'

export class DeviceMongoRepository implements AddDeviceRepository, LoadDevicesRepository {
  public async add (deviceData: AddDeviceModel): Promise<Device> {
    const deviceRecord = await DeviceMongoSchema.create(deviceData)
    return DeviceMongoMapper.toEntity(deviceRecord)
  }

  public async load (collectionId: string): Promise<Device[]> {
    const deviceRecords = await DeviceMongoSchema.find({
      collectionId: collectionId
    })

    return deviceRecords.map(DeviceMongoMapper.toEntity)
  }
}
