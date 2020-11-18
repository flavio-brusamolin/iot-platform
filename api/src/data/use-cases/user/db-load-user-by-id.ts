import { User } from '../../../domain/models/user'
import { LoadUserById } from '../../../domain/use-cases/user/load-user-by-id'
import { LoadUserByIdRepository } from '../../protocols/db/user/load-user-by-id-repository'

export class DbLoadUserById implements LoadUserById {
  public constructor (private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  public async load (userId: string): Promise<User> {
    return await this.loadUserByIdRepository.loadById(userId)
  }
}
