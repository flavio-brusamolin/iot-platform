import express from 'express'
import env from './config/env'
import MongoHelper from '../infra/db/mongo/helpers/mongo-helper'
import AmqpProvider from '../infra/message-queue/amqp/amqp-provider'
import setupRoutes from './config/routes'
import setupMiddlewares from './config/middlewares'

const start = async () => {
  try {
    await MongoHelper.connect(env.mongoUrl)

    const amqpProvider = AmqpProvider.getInstance()
    await amqpProvider.start({
      uri: env.rabbitUrl,
      queues: env.queues
    })

    const app = express()

    setupMiddlewares(app)
    setupRoutes(app)

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  } catch (error) {
    console.error(error)
  }
}

start()
