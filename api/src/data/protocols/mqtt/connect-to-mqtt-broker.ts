import { Broker } from '../../../domain/models/broker'

export interface ConnectToMqttBroker {
  connect: (broker: Broker) => Promise<void>
}
