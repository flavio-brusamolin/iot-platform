import { HandleReceivedData } from '../../../domain/use-cases/mqtt/handle-received-data'

export class MqttHandleReceivedData implements HandleReceivedData {
  public async handle (deviceId: string, data: Record<string, unknown>): Promise<void> {
    console.log(`Message received. => Message: ${data} | DeviceId: ${deviceId}`)
  }
}
