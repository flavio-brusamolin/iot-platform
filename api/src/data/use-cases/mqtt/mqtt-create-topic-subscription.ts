import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Device } from '../../../domain/models/device'
import { CreateTopicSubscription } from '../../../domain/use-cases/mqtt/create-topic-subscription'
import { HandleReceivedData } from '../../../domain/use-cases/mqtt/handle-received-data'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { SubscribeMqttTopic } from '../../protocols/mqtt/subscribe-mqtt-topic'

export class MqttCreateTopicSubscription implements CreateTopicSubscription {
  public constructor (
    private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository,
    private readonly subscribeMqttTopic: SubscribeMqttTopic,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository
  ) {}

  public async createSubscription (device: Device, handleReceivedData: HandleReceivedData): Promise<void> {
    const { mqttInfo: { brokerId } } = device

    const broker = await this.loadBrokerByIdRepository.loadById(brokerId)
    if (broker.status === BrokerStatus.PROCESSING) {
      return null
    }

    try {
      await this.subscribeMqttTopic.subscribe(device, handleReceivedData)
    } catch (error) {
      await this.updateBrokerStatusRepository.updateStatus(brokerId, BrokerStatus.INACTIVE)
      throw error
    }
  }
}
