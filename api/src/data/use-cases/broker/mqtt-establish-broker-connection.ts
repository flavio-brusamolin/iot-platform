import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Broker } from '../../../domain/models/broker'
import { EstablishBrokerConnection } from '../../../domain/use-cases/broker/establish-broker-connection'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { ConnectToMqttBroker } from '../../protocols/mqtt/connect-to-mqtt-broker'

export class MqttEstablishBrokerConnection implements EstablishBrokerConnection {
  public constructor (
    private readonly connectToMqttBroker: ConnectToMqttBroker,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository
  ) {}

  public async establishConnection (broker: Broker): Promise<void> {
    try {
      await this.connectToMqttBroker.connect(broker)
      await this.updateBrokerStatusRepository.updateStatus(broker.id, BrokerStatus.ACTIVE)
    } catch (error) {
      await this.updateBrokerStatusRepository.updateStatus(broker.id, BrokerStatus.INACTIVE)
      throw error
    }
  }
}
