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

  public async connect ({ address, ...options }: BrokerInfo): Promise<void> {
    const client = this.findClient(options.clientId)

    if (!client) {
      const newClient = await connectAsync(address, options)
      MqttProvider.clients.push(newClient)
    }

    // For tests
    console.log('Connect')
    this.printClients()
  }

  public async disconnect (clientId: string): Promise<void> {
    const client = this.findClient(clientId)

    if (client) {
      await client.end()
      MqttProvider.clients = MqttProvider.clients.filter(element => element !== client)
    }

    // For tests
    console.log('Disconnect')
    this.printClients()
  }

  private findClient (clientId: string): AsyncMqttClient {
    return MqttProvider.clients.find(client => {
      const { options } = this.unwrapClient(client)

      if (options.clientId === clientId) {
        return client
      }
    })
  }

  private unwrapClient (asyncClient: any): IMqttClient {
    return asyncClient._client
  }

  // For tests
  private printClients (): void {
    for (const client of MqttProvider.clients) {
      console.log(this.unwrapClient(client).options.clientId)
    }
  }
}
