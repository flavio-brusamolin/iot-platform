import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Device } from '../../../domain/models/device'
import { RemoveTopicSubscription } from '../../../domain/use-cases/mqtt/remove-topic-subscription'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { UnsubscribeMqttTopic } from '../../protocols/mqtt/unsubscribe-mqtt-topic'

export class MqttRemoveTopicSubscription implements RemoveTopicSubscription {
  public constructor (
    private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository,
    private readonly unsubscribeMqttTopic: UnsubscribeMqttTopic,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository
  ) {}

  public async removeSubscription (device: Device): Promise<void> {
    const { mqttInfo: { brokerId } } = device

    const broker = await this.loadBrokerByIdRepository.loadById(brokerId)
    if (broker.status === BrokerStatus.PROCESSING) {
      return null
    }

    try {
      await this.unsubscribeMqttTopic.unsubscribe(device)
    } catch (error) {
      await this.updateBrokerStatusRepository.updateStatus(brokerId, BrokerStatus.INACTIVE)
      throw error
    }
  }
}
