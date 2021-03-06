import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { AuthenticateUser } from '../../../domain/use-cases/user/authenticate-user'

interface SignInContract {
  email: string
  password: string
}

export class SignInController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly authenticateUser: AuthenticateUser
  ) {}

  public async handle (httpRequest: HttpRequest<SignInContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const token = await this.authenticateUser.authenticate({
        email,
        password
      })
      if (!token) {
        return unauthorized()
      }

      return ok({ token })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
