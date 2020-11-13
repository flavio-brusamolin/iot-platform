import { MqttEstablishBrokerConnection } from '../../../../data/use-cases/mqtt/mqtt-establish-broker-connection'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MqttClient } from '../../../../infra/mqtt/mqtt-client'
import MqttProvider from '../../../../infra/mqtt/mqtt-provider'

export const makeMqttEstablishBrokerConnection = (): MqttEstablishBrokerConnection => {
  const mqttClient = new MqttClient(new MqttProvider())
  const brokerMongoRepository = new BrokerMongoRepository()

  return new MqttEstablishBrokerConnection(mqttClient, brokerMongoRepository)
}
