import amqp from 'amqplib'
import env from '../../../main/config/env'
import { PublishBrokerConnectionQueue } from '../../../data/protocols/message-queue/publish-broker-connection-queue'
import { Action } from '../../../domain/enums/action'
import { Broker } from '../../../domain/models/broker'

export class RabbitAdapter implements PublishBrokerConnectionQueue {
  public async publishBrokerConnection (broker: Broker, action: Action): Promise<void> {
    const connection = await amqp.connect(env.rabbitUrl)
    const channel = await connection.createChannel()
    await channel.assertQueue('broker-connection', { durable: true })
    channel.sendToQueue('broker-connection', Buffer.from(JSON.stringify({ ...broker, action })), { persistent: true })
    channel.close()
  }
}
