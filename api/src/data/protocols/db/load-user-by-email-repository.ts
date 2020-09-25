import { User } from '../../../domain/models/user'

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<User>
}
