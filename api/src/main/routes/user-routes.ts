import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeSignInController } from '../factories/controllers/signin/signin-controller-factory'
import { makeCreateBrokerController } from '../factories/controllers/broker/create-broker-controller-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
  router.post('/brokers', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateBrokerController()))
}
