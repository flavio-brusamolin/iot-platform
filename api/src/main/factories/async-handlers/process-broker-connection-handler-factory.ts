import { ProcessBrokerConnectionHandler } from '../../../presentation/async-handlers/process-broker-connection-handler'
import { makeMqttEstablishBrokerConnection } from '../use-cases/broker/mqtt-establish-broker-connection-factory'

export const makeProcessBrokerConnectionHandler = (): ProcessBrokerConnectionHandler => {
  return new ProcessBrokerConnectionHandler(makeMqttEstablishBrokerConnection())
}
