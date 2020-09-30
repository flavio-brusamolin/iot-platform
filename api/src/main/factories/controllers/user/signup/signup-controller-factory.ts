import { SignUpController } from '../../../../../presentation/controllers/user/signup-controller'
import { makeDbAddUser } from '../../../use-cases/user/db-add-user-factory'
import { makeDbAuthenticateUser } from '../../../use-cases/user/db-authenticate-user-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSignUpValidator(), makeDbAddUser(), makeDbAuthenticateUser())
}
