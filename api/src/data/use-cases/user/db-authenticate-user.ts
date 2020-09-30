import { AuthenticateUser, AuthenticateUserModel } from '../../../domain/use-cases/user/authenticate-user'
import { LoadUserByEmailRepository } from '../../protocols/db/user/load-user-by-email-repository'
import { CriptographyComparator } from '../../protocols/criptography/criptography-comparator'
import { TokenGenerator } from '../../protocols/token/token-generator'

export class DbAuthenticateUser implements AuthenticateUser {
  public constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly criptographyComparator: CriptographyComparator,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public async authenticate (credentials: AuthenticateUserModel): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(credentials.email)
    if (!user) {
      return null
    }

    const passwordMatch = await this.criptographyComparator.compare(credentials.password, user.password)
    if (!passwordMatch) {
      return null
    }

    return await this.tokenGenerator.generateToken(user.id)
  }
}
