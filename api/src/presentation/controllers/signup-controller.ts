import { Controller, HttpRequest, HttpResponse, Validator } from '../protocols'
import { badRequest, conflict, created, serverError } from '../helpers/http-helper'
import { DuplicateFieldError } from '../errors'
import { AddUser } from '../../domain/use-cases/add-user'
import { AuthenticateUser } from '../../domain/use-cases/authenticate-user'

interface SignUpContract {
  name: string
  email: string
  password: string
}

export class SignUpController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly addUser: AddUser,
    private readonly authenticateUser: AuthenticateUser
  ) {}

  public async handle (httpRequest: HttpRequest<SignUpContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const user = await this.addUser.add({
        name,
        email,
        password
      })
      if (!user) {
        return conflict(new DuplicateFieldError('email'))
      }

      const token = await this.authenticateUser.authenticate({
        email,
        password
      })

      return created({ token })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
