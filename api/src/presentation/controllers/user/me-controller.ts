import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ok, serverError, unauthorized } from '../../helpers/http-helper'
import { LoadUserById } from '../../../domain/use-cases/user/load-user-by-id'

export class MeController implements Controller {
  public constructor (
    private readonly loadUserById: LoadUserById
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const user = await this.loadUserById.load(userId)
      if (!user) {
        return unauthorized()
      }

      return ok(user)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
