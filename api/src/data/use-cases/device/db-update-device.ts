import { Action } from '../../../domain/enums/action'
import { Device } from '../../../domain/models/device'
import { UpdateDevice, UpdateDeviceModel } from '../../../domain/use-cases/device/update-device'
import { LoadDeviceByIdRepository } from '../../protocols/db/device/load-device-by-id-repository'
import { UpdateDeviceRepository } from '../../protocols/db/device/update-device-repository'
import { PublishTopicSubscriptionQueue } from '../../protocols/message-queue/publish-topic-subscription-queue'

export class DbUpdateDevice implements UpdateDevice {
  public constructor (
    private readonly loadDeviceByIdRepository: LoadDeviceByIdRepository,
    private readonly updateDeviceRepository: UpdateDeviceRepository,
    private readonly publishTopicSubscriptionQueue: PublishTopicSubscriptionQueue
  ) {}

  public async update (deviceId: string, deviceData: UpdateDeviceModel): Promise<Device> {
    const previousDevice = await this.loadDeviceByIdRepository.loadById(deviceId)
    const updatedDevice = await this.updateDeviceRepository.update(deviceId, deviceData)

    if (deviceData.mqttInfo && JSON.stringify(deviceData.mqttInfo) !== JSON.stringify(previousDevice.mqttInfo)) {
      this.publishTopicSubscriptionQueue.publishTopicSubscription(previousDevice, Action.UNSUBSCRIBE)
      this.publishTopicSubscriptionQueue.publishTopicSubscription(updatedDevice, Action.SUBSCRIBE)
    }

    return updatedDevice
  }
}
