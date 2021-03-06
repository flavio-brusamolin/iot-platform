import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { makeDbCheckUserAuthentication } from '../use-cases/user/db-check-user-authentication'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeDbCheckUserAuthentication())
}
