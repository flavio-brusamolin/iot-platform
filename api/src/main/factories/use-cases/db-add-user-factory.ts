import { DbAddUser } from '../../../data/use-cases/db-add-user'
import { UserMongoRepository } from '../../../infra/db/mongo/user/user-mongo-repository'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'

export const makeDbAddUser = (): DbAddUser => {
  const userMongoRepository = new UserMongoRepository()

  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)

  return new DbAddUser(userMongoRepository, bCryptAdapter, userMongoRepository)
}
