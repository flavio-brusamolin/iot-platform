import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/user/signup/signup-controller-factory'
import { makeSignInController } from '../factories/controllers/user/signin/signin-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
