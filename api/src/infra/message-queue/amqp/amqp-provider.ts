import { connect, Connection, Channel } from 'amqplib'

interface AmqpConfig {
  uri: string
  queues: string[]
}

export default class AmqpProvider {
  private static instance: AmqpProvider
  private connection: Connection
  private channel: Channel

  private constructor () {}

  public static getInstance (): AmqpProvider {
    if (!AmqpProvider.instance) {
      AmqpProvider.instance = new AmqpProvider()
    }

    return AmqpProvider.instance
  }

  public async start (amqpConfig: AmqpConfig): Promise<void> {
    await this.establishConnection(amqpConfig.uri)
    await this.createChannel()
    await this.createQueues(amqpConfig.queues)
  }

  private async establishConnection (uri: string): Promise<void> {
    if (!this.connection) {
      this.connection = await connect(uri)
    }
  }

  private async createChannel (): Promise<void> {
    if (!this.channel) {
      this.channel = await this.connection.createChannel()
    }
  }

  private async createQueues (queueNames: string[]): Promise<void> {
    for (const queueName of queueNames) {
      await this.channel.assertQueue(queueName, { durable: true })
    }
  }

  private transformPayload (payload: any): Buffer {
    return Buffer.from(JSON.stringify(payload))
  }

  public publish (queue: string, payload: any): void {
    this.channel.sendToQueue(queue, this.transformPayload(payload), { persistent: true })
  }
}
