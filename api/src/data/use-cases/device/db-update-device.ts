import { Action } from '../../../domain/enums/action'
import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Device } from '../../../domain/models/device'
import { UpdateDevice, UpdateDeviceModel } from '../../../domain/use-cases/device/update-device'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { LoadDeviceByIdRepository } from '../../protocols/db/device/load-device-by-id-repository'
import { LoadDevicesByBrokerIdRepository } from '../../protocols/db/device/load-devices-by-broker-id-repository'
import { UpdateDeviceRepository } from '../../protocols/db/device/update-device-repository'
import { PublishBrokerConnectionQueue } from '../../protocols/message-queue/publish-broker-connection-queue'
import { PublishTopicSubscriptionQueue } from '../../protocols/message-queue/publish-topic-subscription-queue'

export class DbUpdateDevice implements UpdateDevice {
  public constructor (
    private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository,
    private readonly updateDeviceRepository: UpdateDeviceRepository,
    private readonly publishTopicSubscriptionQueue: PublishTopicSubscriptionQueue,
    private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository,
    private readonly loadDevicesByBrokerIdRepository: LoadDevicesByBrokerIdRepository,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository,
    private readonly publishBrokerConnectionQueue: PublishBrokerConnectionQueue
  ) {}

  public async update (deviceId: string, deviceData: UpdateDeviceModel): Promise<Device> {
    const oldDevice = await this.loadDeviceByIdRepository.loadById(deviceId)
    const newDevice = await this.updateDeviceRepository.update(deviceId, deviceData)

    if (deviceData.mqttInfo) {
      this.publishTopicSubscriptionQueue.publishTopicSubscription(oldDevice, Action.UNSUBSCRIBE)
      this.publishTopicSubscriptionQueue.publishTopicSubscription(newDevice, Action.SUBSCRIBE)

      if (oldDevice.mqttInfo.brokerId !== newDevice.mqttInfo.brokerId) {
        const oldBroker = await this.loadBrokerByIdRepository.loadById(oldDevice.mqttInfo.brokerId)
        const referencedDevices = await this.loadDevicesByBrokerIdRepository.loadByBrokerId(oldBroker.id)

        if (oldBroker.status === BrokerStatus.ACTIVE && referencedDevices.length > 0) {
          await this.updateBrokerStatusRepository.updateStatus(oldBroker.id, BrokerStatus.PROCESSING)
          this.publishBrokerConnectionQueue.publishBrokerConnection(oldBroker, Action.DISCONNECT)
        }
      }
    }

    return newDevice
  }
}
