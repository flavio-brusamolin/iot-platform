import { MqttSendData } from '../../../../data/use-cases/mqtt/mqtt-send-data'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MqttClient } from '../../../../infra/mqtt/mqtt-client'
import MqttProvider from '../../../../infra/mqtt/mqtt-provider'

export const makeMqttSendData = (): MqttSendData => {
  const brokerMongoRepository = new BrokerMongoRepository()
  const mqttClient = new MqttClient(new MqttProvider())

  return new MqttSendData(brokerMongoRepository, mqttClient)
}
