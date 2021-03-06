import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeCreateDeviceController } from '../factories/controllers/device/create-device/create-device-controller-factory'
import { makeLoadDevicesController } from '../factories/controllers/device/load-devices/load-devices-controller-factory'
import { makeUpdateDeviceController } from '../factories/controllers/device/update-device/update-device-controller-factory'
import { makeLoadDeviceByIdController } from '../factories/controllers/device/load-devices/load-device-by-id-controller-factory'

export default (router: Router): void => {
  router.post('/collections/:collectionId/devices', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateDeviceController()))
  router.get('/collections/:collectionId/devices', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadDevicesController()))
  router.get('/devices/:deviceId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadDeviceByIdController()))
  router.patch('/devices/:deviceId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateDeviceController()))
}
