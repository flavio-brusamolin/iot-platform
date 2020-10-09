import { DbLoadUserByEmail } from '../../../../data/use-cases/user/db-load-user-by-email'
import { UserMongoRepository } from '../../../../infra/db/mongo/user/user-mongo-repository'

export const makeDbLoadUserByEmail = (): DbLoadUserByEmail => {
  return new DbLoadUserByEmail(new UserMongoRepository())
}
