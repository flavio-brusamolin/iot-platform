import { ProcessBrokerConnectionHandler } from '../../../presentation/async-handlers/process-broker-connection-handler'
import { makeMqttEstablishBrokerConnection } from '../use-cases/mqtt/mqtt-establish-broker-connection-factory'
import { makeMqttkillBrokerConnection } from '../use-cases/mqtt/mqtt-kill-broker-connection-factory'

export const makeProcessBrokerConnectionHandler = (): ProcessBrokerConnectionHandler => {
  return new ProcessBrokerConnectionHandler(makeMqttEstablishBrokerConnection(), makeMqttkillBrokerConnection())
}
