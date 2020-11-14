import { Action } from '../../../domain/enums/action'
import { BrokerStatus } from '../../../domain/enums/broker-status'
import { InitializeConnections } from '../../../domain/use-cases/mqtt/initialize-connections'
import { LoadBrokersByStatusRepository } from '../../protocols/db/broker/load-brokers-by-status-repository'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { LoadDevicesByBrokerIdRepository } from '../../protocols/db/device/load-devices-by-broker-id-repository'
import { PublishBrokerConnectionQueue } from '../../protocols/message-queue/publish-broker-connection-queue'
import { PublishTopicSubscriptionQueue } from '../../protocols/message-queue/publish-topic-subscription-queue'

export class MqttInitializeConnections implements InitializeConnections {
  public constructor (
    private readonly loadBrokersByStatusRepository: LoadBrokersByStatusRepository,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository,
    private readonly publishBrokerConnectionQueue: PublishBrokerConnectionQueue,
    private readonly loadDevicesByBrokerIdRepository: LoadDevicesByBrokerIdRepository,
    private readonly publishTopicSubscriptionQueue: PublishTopicSubscriptionQueue
  ) {}

  public async init (): Promise<void> {
    const brokers = await this.loadBrokersByStatusRepository.loadByStatus(BrokerStatus.ACTIVE)
    for (const broker of brokers) {
      await this.updateBrokerStatusRepository.updateStatus(broker.id, BrokerStatus.PROCESSING)
      this.publishBrokerConnectionQueue.publishBrokerConnection(broker, Action.CONNECT)

      const devices = await this.loadDevicesByBrokerIdRepository.loadByBrokerId(broker.id)
      for (const device of devices) {
        this.publishTopicSubscriptionQueue.publishTopicSubscription(device, Action.SUBSCRIBE)
      }
    }
  }
}
