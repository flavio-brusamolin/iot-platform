import { SignUpController } from '../../../../presentation/controllers/signup-controller'
import { makeDbAddUser } from '../../use-cases/db-add-user-factory'
import { makeDbAuthenticateUser } from '../../use-cases/db-authenticate-user-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSignUpValidator(), makeDbAddUser(), makeDbAuthenticateUser())
}
