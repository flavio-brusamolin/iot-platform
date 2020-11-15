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
    const previousDevice = await this.loadDeviceByIdRepository.loadById(deviceId)
    const updatedDevice = await this.updateDeviceRepository.update(deviceId, deviceData)

    if (deviceData.mqttInfo && JSON.stringify(deviceData.mqttInfo) !== JSON.stringify(previousDevice.mqttInfo)) {
      this.publishTopicSubscriptionQueue.publishTopicSubscription(previousDevice, Action.UNSUBSCRIBE)
      this.publishTopicSubscriptionQueue.publishTopicSubscription(updatedDevice, Action.SUBSCRIBE)

      if (previousDevice.mqttInfo.brokerId !== updatedDevice.mqttInfo.brokerId) {
        const previousBroker = await this.loadBrokerByIdRepository.loadById(previousDevice.mqttInfo.brokerId)
        const linkedDevices = await this.loadDevicesByBrokerIdRepository.loadByBrokerId(previousBroker.id)

        if (previousBroker.status === BrokerStatus.ACTIVE && linkedDevices.length === 0) {
          await this.updateBrokerStatusRepository.updateStatus(previousBroker.id, BrokerStatus.PROCESSING)
          this.publishBrokerConnectionQueue.publishBrokerConnection(previousBroker, Action.DISCONNECT)
        }
      }
    }

    return updatedDevice
  }
}
