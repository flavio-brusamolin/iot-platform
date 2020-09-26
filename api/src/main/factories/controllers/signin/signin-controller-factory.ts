import { SignInController } from '../../../../presentation/controllers/signin-controller'
import { makeDbAuthenticateUser } from '../../use-cases/db-authenticate-user-factory'
import { makeSignInValidator } from './signin-validator-factory'

export const makeSignInController = (): SignInController => {
  return new SignInController(makeSignInValidator(), makeDbAuthenticateUser())
}
