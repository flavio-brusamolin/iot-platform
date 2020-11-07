// import { Action } from '../../../domain/enums/action'
// import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Device } from '../../../domain/models/device'
import { UpdateDevice, UpdateDeviceModel } from '../../../domain/use-cases/device/update-device'
// import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
// import { LoadDeviceByIdRepository } from '../../protocols/db/device/load-device-by-id-repository'
import { UpdateDeviceRepository } from '../../protocols/db/device/update-device-repository'

export class DbUpdateDevice implements UpdateDevice {
  public constructor (
    // private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository,
    private readonly updateDeviceRepository: UpdateDeviceRepository
    // private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository
  ) {}

  public async update (deviceId: string, deviceData: UpdateDeviceModel): Promise<Device> {
    return await this.updateDeviceRepository.update(deviceId, deviceData)

    // const oldDevice = await this.loadDeviceByIdRepository.loadById(deviceId)

    // const newDevice = await this.updateDeviceRepository.update(deviceId, deviceData)

    // if (deviceData.mqttInfo) {
    //   this.publishTopicSubscriptionQueue.publishTopicSubscription(oldDevice, Action.UNSUBSCRIBE)
    //   this.publishTopicSubscriptionQueue.publishTopicSubscription(newDevice, Action.SUBSCRIBE)

    //   if (oldDevice.mqttInfo.brokerId === newDevice.mqttInfo.brokerId) {
    //     const oldBroker = await this.loadBrokerByIdRepository.loadById(oldDevice.mqttInfo.brokerId)

    //     const referencedDevices = this.loadDevicesByBrokerId.loadByBrokerId(oldBroker.id)

    //     if (oldBroker.status === BrokerStatus.ACTIVE && referencedDevices.length > 0) {
    //       this.publishBrokerConnectionQueue.publishBrokerConnection(oldBroker, Action.DISCONNECT)
    //     }
    //   }
    // }

    // return newDevice
  }
}
