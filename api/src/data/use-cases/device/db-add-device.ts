import { AddDevice, AddDeviceModel } from '../../../domain/use-cases/device/add-device'
import { Device } from '../../../domain/models/device'
import { AddDeviceRepository } from '../../protocols/db/device/add-device-repository'
import { PublishTopicSubscriptionQueue } from '../../protocols/message-queue/publish-topic-subscription-queue'
import { Action } from '../../../domain/enums/action'

export class DbAddDevice implements AddDevice {
  public constructor (
    private readonly addDeviceRepository: AddDeviceRepository,
    private readonly publishTopicSubscriptionQueue: PublishTopicSubscriptionQueue
  ) {}

  public async add (deviceData: AddDeviceModel): Promise<Device> {
    const device = await this.addDeviceRepository.add(deviceData)

    this.publishTopicSubscriptionQueue.publishTopicSubscription(device, Action.SUBSCRIBE)

    return device
  }
}
