import { SignUpController } from '../../../presentation/controllers/signup-controller'
import { makeDbAddUser } from '../use-cases/db-add-user-factory'
import { makeDbAuthenticateUser } from '../use-cases/db-authenticate-user-factory'
import { Validator } from '../../../presentation/protocols'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(new FakeValidator(), makeDbAddUser(), makeDbAuthenticateUser())
}

class FakeValidator implements Validator {
  public validate (_input: any): Error {
    return null
  }
}
