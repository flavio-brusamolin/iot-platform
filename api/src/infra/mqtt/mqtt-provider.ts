import { connectAsync, AsyncMqttClient, IMqttClient } from 'async-mqtt'
import { HandleReceivedData } from '../../domain/use-cases/mqtt/handle-received-data'

interface BrokerInfo {
  clientId: string
  username: string
  password: string
  address: string
  port: number
}

interface SubscriptionData {
  deviceId: string
  clientId: string
  topic: string
}

interface PublicationData {
  clientId: string
  topic: string
  data: Record<string, any>
}

export default class MqttProvider {
  private static clients: AsyncMqttClient[] = []

  public async connect ({ address, ...options }: BrokerInfo): Promise<void> {
    const client = this.findClient(options.clientId)

    if (!client) {
      const newClient = await connectAsync(address, options)
      MqttProvider.clients.push(newClient)

      console.log(`Connection established. => BrokerId: ${options.clientId}`)
    }
  }

  public async disconnect (clientId: string): Promise<void> {
    const client = this.findClient(clientId)

    if (client) {
      await client.end()
      MqttProvider.clients = MqttProvider.clients.filter(element => element !== client)

      console.log(`Connection removed. => BrokerId: ${clientId}`)
    }
  }

  public async subscribe ({ deviceId, clientId, topic }: SubscriptionData, handleReceivedData: HandleReceivedData): Promise<void> {
    const client = this.findClient(clientId)

    if (client) {
      await client.subscribe(topic)

      console.log(`Subscription made. => Topic: ${topic} | BrokerId: ${clientId}`)

      client.on('message', async (receivedTopic, message) => {
        const data = message.toString()

        if (receivedTopic === topic && this.isJSON(data)) {
          await handleReceivedData.handle(deviceId, JSON.parse(data))
        }
      })
    }
  }

  public async unsubscribe ({ clientId, topic }: Omit<SubscriptionData, 'deviceId'>): Promise<void> {
    const client = this.findClient(clientId)

    if (client) {
      await client.unsubscribe(topic)

      console.log(`Subscription removed. => Topic: ${topic} | BrokerId: ${clientId}`)
    }
  }

  public async publish ({ clientId, topic, data }: PublicationData): Promise<void> {
    const client = this.findClient(clientId)

    if (client) {
      await client.publish(topic, JSON.stringify(data))

      console.log(`Message sent. => Value: ${JSON.stringify(data)} Topic: ${topic}`)
    }
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

  private isJSON (data: string): boolean {
    try {
      JSON.parse(data)
    } catch (error) {
      return false
    }
    return true
  }
}
