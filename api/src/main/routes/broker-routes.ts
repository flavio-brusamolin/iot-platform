import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateBrokerController } from '../factories/controllers/broker/create-broker/create-broker-controller-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadBrokersController } from '../factories/controllers/broker/load-brokers/load-broker-controller-factory'

export default (router: Router): void => {
  router.post('/brokers', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateBrokerController()))
  router.get('/brokers', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadBrokersController()))
}
