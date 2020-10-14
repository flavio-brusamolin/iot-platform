import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeCreateDeviceController } from '../factories/controllers/device/create-device/create-device-controller-factory'

export default (router: Router): void => {
  router.post('/collections/:collectionId/devices', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateDeviceController()))
}