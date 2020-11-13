import { MqttCreateTopicSubscription } from '../../../../data/use-cases/mqtt/mqtt-create-topic-subscription'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { MqttClient } from '../../../../infra/mqtt/mqtt-client'
import MqttProvider from '../../../../infra/mqtt/mqtt-provider'

export const makeMqttCreateTopicSubscription = (): MqttCreateTopicSubscription => {
  const mqttClient = new MqttClient(new MqttProvider())
  const brokerMongoRepository = new BrokerMongoRepository()

  return new MqttCreateTopicSubscription(brokerMongoRepository, mqttClient, brokerMongoRepository)
}
