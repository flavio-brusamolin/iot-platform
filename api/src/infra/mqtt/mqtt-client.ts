import { ConnectToMqttBroker } from '../../data/protocols/mqtt/connect-to-mqtt-broker'
import { Broker } from '../../domain/models/broker'
import MqttProvider from './mqtt-provider'

export class MqttClient implements ConnectToMqttBroker {
  public constructor (private readonly mqttProvider: MqttProvider) {}

  public async connect ({ id, credentials }: Broker): Promise<void> {
    await this.mqttProvider.connect({
      clientId: id,
      ...credentials
    })
  }
}
