import express from 'express'
import MongoHelper from '../infra/db/mongoose/helpers/mongo-helper'
import env from './config/env'
import setupRoutes from './config/routes'
import setupMiddlewares from './config/middlewares'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = express()

    setupMiddlewares(app)
    setupRoutes(app)

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
