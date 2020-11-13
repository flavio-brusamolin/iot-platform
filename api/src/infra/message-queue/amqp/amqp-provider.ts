import { connect, Connection, Channel, Replies } from 'amqplib'
import { AsyncHandler } from '../../../presentation/protocols/async-handler'
import { MessageQueueConfig, MessageQueueProvider } from '../protocols/message-queue-provider'

export default class AmqpProvider implements MessageQueueProvider {
  private static connection: Connection
  private static channel: Channel

  public async start ({ uri, queues }: MessageQueueConfig): Promise<void> {
    await this.establishConnection(uri)
    await this.createChannel()
    await this.createQueues(queues)
  }

  public publish (queue: string, payload: any): boolean {
    return AmqpProvider.channel.sendToQueue(queue, this.transformPayload(payload), { persistent: true })
  }

  public subscribe (queue: string, asyncHandler: AsyncHandler): Omit<Replies.Consume, 'consumerTag'> {
    return AmqpProvider.channel.consume(queue, async message => {
      const ack = await asyncHandler.handle({
        content: JSON.parse(message.content.toString())
      })

      if (ack) {
        AmqpProvider.channel.ack(message)
      } else {
        AmqpProvider.channel.reject(message, true)
      }
    })
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
