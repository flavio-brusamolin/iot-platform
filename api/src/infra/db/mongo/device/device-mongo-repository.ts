import { isValidObjectId } from 'mongoose'
import DeviceMongoSchema from './device-mongo-schema'
import DeviceMongoMapper from './device-mongo-mapper'
import { Device } from '../../../../domain/models/device'
import { AddDeviceModel } from '../../../../domain/use-cases/device/add-device'
import { AddDeviceRepository } from '../../../../data/protocols/db/device/add-device-repository'
import { LoadDevicesRepository } from '../../../../data/protocols/db/device/load-devices-repository'
import { UpdateDeviceRepository } from '../../../../data/protocols/db/device/update-device-repository'
import { LoadDeviceByIdRepository } from '../../../../data/protocols/db/device/load-device-by-id-repository'
import { UpdateDeviceModel } from '../../../../domain/use-cases/device/update-device'
import { LoadDeviceByMqttInfoRepository, MqttInfo } from '../../../../data/protocols/db/device/load-device-by-mqtt-info-repository'

export class DeviceMongoRepository implements AddDeviceRepository, LoadDevicesRepository, LoadDeviceByIdRepository, UpdateDeviceRepository, LoadDeviceByMqttInfoRepository {
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

  public async update (deviceId: string, { mqttInfo, ...deviceData }: UpdateDeviceModel): Promise<Device> {
    if (mqttInfo?.topic) {
      deviceData['mqttInfo.topic'] = mqttInfo.topic
    }

    if (mqttInfo?.brokerId) {
      deviceData['mqttInfo.brokerId'] = mqttInfo.brokerId
    }

    const deviceRecord = await DeviceMongoSchema.findByIdAndUpdate(
      deviceId,
      { $set: deviceData },
      { new: true }
    )

    return DeviceMongoMapper.toEntity(deviceRecord)
  }

  public async loadByMqttInfo ({ topic, brokerId }: MqttInfo): Promise<Device> {
    const deviceRecord = await DeviceMongoSchema.findOne({
      'mqttInfo.topic': topic,
      'mqttInfo.brokerId': brokerId
    })

    return deviceRecord && DeviceMongoMapper.toEntity(deviceRecord)
  }
}
