import { isValidObjectId } from 'mongoose'
import DeviceMongoSchema from './device-mongo-schema'
import DeviceMongoMapper from './device-mongo-mapper'
import { Device } from '../../../../domain/models/device'
import { AddDeviceModel } from '../../../../domain/use-cases/device/add-device'
import { AddDeviceRepository } from '../../../../data/protocols/db/device/add-device-repository'
import { LoadDevicesRepository } from '../../../../data/protocols/db/device/load-devices-repository'
import { UpdateDeviceRepository } from '../../../../data/protocols/db/device/update-device-repository'
import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/device/load-device-by-id-repository'

export class DeviceMongoRepository implements AddDeviceRepository, LoadDevicesRepository, LoadDeviceByIdRepository, UpdateDeviceRepository {
  public async add (deviceData: AddDeviceModel): Promise<Device> {
    const deviceRecord = await DeviceMongoSchema.create(deviceData)
    return DeviceMongoMapper.toEntity(deviceRecord)
  }

  public async load (collectionId: string): Promise<Device[]> {
    const deviceRecords = await DeviceMongoSchema.find({ collectionId })
    return deviceRecords.map(DeviceMongoMapper.toEntity)
  }

  public async loadById (deviceId: string): Promise<Device> {
    if (!isValidObjectId(deviceId)) {
      return null
    }

    const deviceRecord = await DeviceMongoSchema.findById(deviceId)
    return deviceRecord && DeviceMongoMapper.toEntity(deviceRecord)
  }

  public async update (deviceId: string, newDevice: Device): Promise<Device> {
    const deviceRecord = await DeviceMongoSchema.findByIdAndUpdate(deviceId,
      newDevice,
      { new: true }
    )

    return DeviceMongoMapper.toEntity(deviceRecord)
  }
}
