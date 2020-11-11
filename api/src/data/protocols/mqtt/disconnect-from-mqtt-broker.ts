import { Broker } from '../../../domain/models/broker'

export interface DisconnectFromMqttBroker {
  disconnect: (broker: Broker) => Promise<void>
}
