import { CheckUserAuthentication } from '../../../domain/use-cases/user/check-user-authentication'
import { TokenVerifier } from '../../protocols/token/token-verifier'

export class DbCheckUserAuthentication implements CheckUserAuthentication {
  public constructor (private readonly tokenVerifier: TokenVerifier) {}

  public async checkAuthentication (token: string): Promise<string> {
    try {
      return await this.tokenVerifier.verifyToken(token)
    } catch (error) {
      return null
    }
  }
}
