import { connect, Connection, Channel } from 'amqplib'
import { MessageQueueProvider } from '../protocols/message-queue-provider'

interface AmqpConfig {
  uri: string
  queues: string[]
}

export default class AmqpProvider implements MessageQueueProvider {
  private static connection: Connection
  private static channel: Channel

  public async start ({ uri, queues }: AmqpConfig): Promise<void> {
    await this.establishConnection(uri)
    await this.createChannel()
    await this.createQueues(queues)
  }

  public publish (queue: string, payload: any): void {
    AmqpProvider.channel.sendToQueue(queue, this.transformPayload(payload), { persistent: true })
  }

  private async establishConnection (uri: string): Promise<void> {
    if (!AmqpProvider.connection) {
      AmqpProvider.connection = await connect(uri)
    }
  }

  private async createChannel (): Promise<void> {
    if (!AmqpProvider.channel) {
      AmqpProvider.channel = await AmqpProvider.connection.createChannel()
    }
  }

  private async createQueues (queues: string[]): Promise<void> {
    for (const queue of queues) {
      await AmqpProvider.channel.assertQueue(queue, { durable: true })
    }
  }

  private transformPayload (payload: any): Buffer {
    return Buffer.from(JSON.stringify(payload))
  }
}
