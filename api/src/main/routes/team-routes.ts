import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddMemberController } from '../factories/controllers/team/add-member/add-member-controller-factory'
import { makeLoadTeamController } from '../factories/controllers/team/load-team/load-team-controller-factory'
import { makeDeleteMemberController } from '../factories/controllers/team/delete-member/delete-member-controller-factory'

export default (router: Router): void => {
  router.post('/teams/:teamId/members', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddMemberController()))
  router.delete('/teams/:teamId/members/:memberId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteMemberController()))
  router.get('/teams/:teamId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadTeamController()))
}
