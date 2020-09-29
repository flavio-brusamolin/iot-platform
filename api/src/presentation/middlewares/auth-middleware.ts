import { CheckUserAuthentication } from '../../domain/use-cases/check-user-authentication'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { ok, serverError, unauthorized } from '../helpers/http-helper'

export class AuthMiddleware implements Middleware {
  private readonly TOKEN_PREFIX = 'Bearer '

  public constructor (private readonly checkUserAuthentication: CheckUserAuthentication) {}

  public async handle ({ headers }: HttpRequest<any>): Promise<HttpResponse> {
    try {
      let token: string = headers?.['x-access-token'] || headers?.authorization
      if (!token) {
        return unauthorized()
      }

      if (token.startsWith(this.TOKEN_PREFIX)) {
        [, token] = token.split(this.TOKEN_PREFIX)
      }

      const userId = await this.checkUserAuthentication.checkAuthentication(token)
      if (!userId) {
        return unauthorized()
      }

      return ok({ userId })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
