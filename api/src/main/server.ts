import express from 'express'
import env from './config/env'
import MongoHelper from '../infra/db/mongo/helpers/mongo-helper'
import AmqpProvider from '../infra/message-queue/amqp/amqp-provider'
import setupRoutes from './config/routes'
import setupMiddlewares from './config/middlewares'

class Server {
  private async initDatabase (): Promise<void> {
    await MongoHelper.connect(env.mongoUrl)
  }

  private async initMessageQueue (): Promise<void> {
    const amqpProvider = new AmqpProvider()
    await amqpProvider.start({
      uri: env.rabbitUrl,
      queues: env.queues
    })
  }

  private initApplication (): void {
    const app = express()

    setupMiddlewares(app)
    setupRoutes(app)

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }

  public async start (): Promise<void> {
    try {
      await this.initDatabase()
      await this.initMessageQueue()
      this.initApplication()
    } catch (error) {
      console.error(error)
    }
  }
}

new Server().start()
