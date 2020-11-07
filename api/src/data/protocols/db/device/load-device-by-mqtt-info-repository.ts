import { Device } from '../../../../domain/models/device'

export interface MqttInfo {
  topic: string
  brokerId: string
}

export interface LoadDeviceByMqttInfoRepository {
  loadByMqttInfo: (mqttInfo: MqttInfo) => Promise<Device>
}
