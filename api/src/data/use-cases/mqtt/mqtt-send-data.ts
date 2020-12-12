import { BrokerStatus } from '../../../domain/enums/broker-status'
import { Device } from '../../../domain/models/device'
import { Variable } from '../../../domain/models/variable'
import { SendData } from '../../../domain/use-cases/mqtt/send-data'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
import { PublishOnMqttTopic } from '../../protocols/mqtt/publish-on-mqtt-topic'

export class MqttSendData implements SendData {
  public constructor (
    private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository,
    private readonly publishOnMqttTopic: PublishOnMqttTopic
  ) {}

  public async send (device: Device, variable: Variable, value: number): Promise<void> {
    const broker = await this.loadBrokerByIdRepository.loadById(device.mqttInfo.brokerId)
    if (broker.status !== BrokerStatus.ACTIVE) {
      return null
    }

    const data = { [variable.key]: value }
    await this.publishOnMqttTopic.publish(device, data)
  }
}
