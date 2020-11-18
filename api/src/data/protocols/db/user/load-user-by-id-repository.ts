import { User } from '../../../../domain/models/user'

export interface LoadUserByIdRepository {
  loadById: (userId: string) => Promise<User>
}
