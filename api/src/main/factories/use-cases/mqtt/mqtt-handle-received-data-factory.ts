import { MqttHandleReceivedData } from '../../../../data/use-cases/mqtt/mqtt-handle-received-data'
import { VariableMongoRepository } from '../../../../infra/db/mongo/variable/variable-mongo-repository'

export const makeMqttHandleReceivedData = (): MqttHandleReceivedData => {
  const variableMongoRepository = new VariableMongoRepository()
  return new MqttHandleReceivedData(variableMongoRepository, variableMongoRepository)
}
