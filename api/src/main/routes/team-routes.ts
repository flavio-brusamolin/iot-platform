import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddMemberController } from '../factories/controllers/team/add-member/add-member-controller-factory'

export default (router: Router): void => {
  router.post('/teams/:teamId/members', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddMemberController()))
}
