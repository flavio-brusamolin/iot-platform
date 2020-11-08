import { ProcessBrokerConnectionHandler } from '../../../presentation/async-handlers/process-broker-connection-handler'

export const makeProcessBrokerConnectionHandler = (): ProcessBrokerConnectionHandler => {
  return new ProcessBrokerConnectionHandler()
}
