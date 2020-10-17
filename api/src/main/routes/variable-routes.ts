import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeCreateVariableController } from '../factories/controllers/variable/create-variable/create-variable-controller-factory'

export default (router: Router): void => {
  router.post('/devices/:deviceId/variables', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateVariableController()))
}