import { connectAsync, AsyncMqttClient, IMqttClient } from 'async-mqtt'

interface BrokerInfo {
  clientId: string
  username: string
  password: string
  address: string
  port: number
}

export default class MqttProvider {
  private static clients: AsyncMqttClient[] = []

  public async connect ({ address, ...info }: BrokerInfo): Promise<void> {
    const existentClient = MqttProvider.clients.find(client => {
      const { options } = this.unwrapMqttClient(client)

      if (options.clientId === info.clientId) {
        return client
      }
    })

    if (!existentClient) {
      const client = await connectAsync(address, info)
      MqttProvider.clients.push(client)
    }
  }

  private unwrapMqttClient (asyncClient: any): IMqttClient {
    return asyncClient._client
  }
}
