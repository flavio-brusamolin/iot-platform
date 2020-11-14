import { MqttRemoveTopicSubscription } from '../../../../data/use-cases/mqtt/mqtt-remove-topic-subscription'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MqttClient } from '../../../../infra/mqtt/mqtt-client'
import MqttProvider from '../../../../infra/mqtt/mqtt-provider'

export const makeMqttRemoveTopicSubscription = (): MqttRemoveTopicSubscription => {
  const mqttClient = new MqttClient(new MqttProvider())
  const brokerMongoRepository = new BrokerMongoRepository()

  return new MqttRemoveTopicSubscription(brokerMongoRepository, mqttClient, brokerMongoRepository)
}
