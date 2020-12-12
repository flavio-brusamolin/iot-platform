import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeCreateVariableController } from '../factories/controllers/variable/create-variable/create-variable-controller-factory'
import { makeLoadVariablesController } from '../factories/controllers/variable/load-variables/load-variables-controller-factory'
import { makeLoadVariableByIdController } from '../factories/controllers/variable/load-variables/load-variable-by-id-controller-factory'
import { makeSendVariableDataController } from '../factories/controllers/variable/send-variable-data/send-variable-data-controller-factory'

export default (router: Router): void => {
  router.post('/devices/:deviceId/variables', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateVariableController()))
  router.get('/devices/:deviceId/variables', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadVariablesController()))
  router.get('/variables/:variableId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadVariableByIdController()))
  router.post('/variables/:variableId/data', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeSendVariableDataController()))
}
