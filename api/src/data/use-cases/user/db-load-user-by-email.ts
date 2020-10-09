import { User } from '../../../domain/models/user'
import { LoadUserByEmail } from '../../../domain/use-cases/user/load-user-by-email'
import { LoadUserByEmailRepository } from '../../protocols/db/user/load-user-by-email-repository'

export class DbLoadUserByEmail implements LoadUserByEmail {
  public constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  public async load (email: string): Promise<User> {
    return await this.loadUserByEmailRepository.loadByEmail(email)
  }
}
