import { MqttKillBrokerConnection } from '../../../../data/use-cases/broker/mqtt-kill-broker-connection'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MqttClient } from '../../../../infra/mqtt/mqtt-client'
import MqttProvider from '../../../../infra/mqtt/mqtt-provider'

export const makeMqttkillBrokerConnection = (): MqttKillBrokerConnection => {
  const mqttClient = new MqttClient(new MqttProvider())
  const brokerMongoRepository = new BrokerMongoRepository()

  return new MqttKillBrokerConnection(mqttClient, brokerMongoRepository)
}
