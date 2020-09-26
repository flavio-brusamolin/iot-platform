import { SignInController } from '../../../presentation/controllers/signin-controller'
import { Validator } from '../../../presentation/protocols'
import { makeDbAuthenticateUser } from '../use-cases/db-authenticate-user-factory'

export const makeSignInController = (): SignInController => {
  return new SignInController(new FakeValidator(), makeDbAuthenticateUser())
}

class FakeValidator implements Validator {
  public validate (_input: any): Error {
    return null
  }
}
