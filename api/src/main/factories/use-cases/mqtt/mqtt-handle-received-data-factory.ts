import { MqttHandleReceivedData } from '../../../../data/use-cases/mqtt/mqtt-handle-received-data'

export const makeMqttHandleReceivedData = (): MqttHandleReceivedData => {
  return new MqttHandleReceivedData()
}
