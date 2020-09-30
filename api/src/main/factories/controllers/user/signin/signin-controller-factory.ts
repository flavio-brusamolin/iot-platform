import { SignInController } from '../../../../../presentation/controllers/user/signin-controller'
import { makeDbAuthenticateUser } from '../../../use-cases/user/db-authenticate-user-factory'
import { makeSignInValidator } from './signin-validator-factory'

export const makeSignInController = (): SignInController => {
  return new SignInController(makeSignInValidator(), makeDbAuthenticateUser())
}
