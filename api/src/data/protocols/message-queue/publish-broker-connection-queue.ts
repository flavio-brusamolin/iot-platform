import { Action } from '../../../domain/enums/action'
import { Broker } from '../../../domain/models/broker'

export interface PublishBrokerConnectionQueue {
  publishBrokerConnection: (broker: Broker, action: Action) => Promise<void>
}
