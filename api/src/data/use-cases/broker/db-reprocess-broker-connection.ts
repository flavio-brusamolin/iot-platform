import { Action } from '../../../domain/enums/action'
import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Broker } from '../../../domain/models/broker'
import { ReprocessBrokerConnection } from '../../../domain/use-cases/broker/reprocess-broker-connection'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { LoadDevicesByBrokerIdRepository } from '../../protocols/db/device/load-devices-by-broker-id-repository'
import { PublishBrokerConnectionQueue } from '../../protocols/message-queue/publish-broker-connection-queue'
import { PublishTopicSubscriptionQueue } from '../../protocols/message-queue/publish-topic-subscription-queue'

export class DbReprocessBrokerConnection implements ReprocessBrokerConnection {
  public constructor (
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository,
    private readonly publishBrokerConnectionQueue: PublishBrokerConnectionQueue,
    private readonly loadDevicesByBrokerIdRepository: LoadDevicesByBrokerIdRepository,
    private readonly publishTopicSubscriptionQueue: PublishTopicSubscriptionQueue
  ) {}

  public async reprocess (broker: Broker): Promise<Broker> {
    if (broker.status !== BrokerStatus.INACTIVE) {
      return null
    }

    const updatedBroker = await this.updateBrokerStatusRepository.updateStatus(broker.id, BrokerStatus.PROCESSING)

    this.publishBrokerConnectionQueue.publishBrokerConnection(updatedBroker, Action.CONNECT)

    const devices = await this.loadDevicesByBrokerIdRepository.loadByBrokerId(broker.id)
    for (const device of devices) {
      this.publishTopicSubscriptionQueue.publishTopicSubscription(device, Action.SUBSCRIBE)
    }

    return updatedBroker
  }
}
