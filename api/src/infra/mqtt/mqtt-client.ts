import { ConnectToMqttBroker } from '../../data/protocols/mqtt/connect-to-mqtt-broker'
import { DisconnectFromMqttBroker } from '../../data/protocols/mqtt/disconnect-from-mqtt-broker'
import { PublishOnMqttTopic } from '../../data/protocols/mqtt/publish-on-mqtt-topic'
import { SubscribeMqttTopic } from '../../data/protocols/mqtt/subscribe-mqtt-topic'
import { UnsubscribeMqttTopic } from '../../data/protocols/mqtt/unsubscribe-mqtt-topic'
import { Broker } from '../../domain/models/broker'
import { Device } from '../../domain/models/device'
import { HandleReceivedData } from '../../domain/use-cases/mqtt/handle-received-data'
import MqttProvider from './mqtt-provider'

export class MqttClient implements ConnectToMqttBroker, DisconnectFromMqttBroker, SubscribeMqttTopic, UnsubscribeMqttTopic, PublishOnMqttTopic {
  public constructor (private readonly mqttProvider: MqttProvider) {}

  public async connect ({ id, credentials }: Broker): Promise<void> {
    await this.mqttProvider.connect({
      clientId: id,
      ...credentials
    })
  }

  public async disconnect ({ id: clientId }: Broker): Promise<void> {
    await this.mqttProvider.disconnect(clientId)
  }

  public async subscribe ({ id, mqttInfo }: Device, handleReceivedData: HandleReceivedData): Promise<void> {
    const subscriptionData = {
      deviceId: id,
      clientId: mqttInfo.brokerId,
      topic: mqttInfo.topic
    }

    await this.mqttProvider.subscribe(subscriptionData, handleReceivedData)
  }

  public async unsubscribe ({ mqttInfo: { brokerId, topic } }: Device): Promise<void> {
    await this.mqttProvider.unsubscribe({
      clientId: brokerId,
      topic
    })
  }

  public async publish ({ mqttInfo: { brokerId, topic } }: Device, data: Record<string, number>): Promise<void> {
    await this.mqttProvider.publish({
      clientId: brokerId,
      topic,
      data
    })
  }
}
