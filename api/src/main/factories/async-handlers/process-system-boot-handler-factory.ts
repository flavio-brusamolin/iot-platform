import { ProcessSystemBootHandler } from '../../../presentation/async-handlers/process-system-boot-handler'
import { makeMqttInitializeConnections } from '../use-cases/mqtt/mqtt-initialize-connections-factory'

export const makeProcessSystemBootHandler = (): ProcessSystemBootHandler => {
  return new ProcessSystemBootHandler(makeMqttInitializeConnections())
}
