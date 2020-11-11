import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Broker } from '../../../domain/models/broker'
import { KillBrokerConnection } from '../../../domain/use-cases/broker/kill-broker-connection'
import { UpdateBrokerStatusRepository } from '../../protocols/db/broker/update-broker-status-repository'
import { DisconnectFromMqttBroker } from '../../protocols/mqtt/disconnect-from-mqtt-broker'

export class MqttKillBrokerConnection implements KillBrokerConnection {
  public constructor (
    private readonly disconnectFromMqttBroker: DisconnectFromMqttBroker,
    private readonly updateBrokerStatusRepository: UpdateBrokerStatusRepository
  ) {}

  public async killConnection (broker: Broker): Promise<void> {
    await this.disconnectFromMqttBroker.disconnect(broker)
    await this.updateBrokerStatusRepository.updateStatus(broker.id, BrokerStatus.INACTIVE)
  }
}
