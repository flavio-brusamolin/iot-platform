import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeCreateCollectionController } from '../factories/controllers/collection/create-collection/create-collection-controller-factory'
import { makeLoadCollectionsController } from '../factories/controllers/collection/load-collections/load-collections-controller-factory'

export default (router: Router): void => {
  router.post('/collections', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateCollectionController()))
  router.get('/collections', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadCollectionsController()))
}
