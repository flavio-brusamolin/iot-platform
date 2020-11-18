import { DbLoadUserById } from '../../../../data/use-cases/user/db-load-user-by-id'
import { UserMongoRepository } from '../../../../infra/db/mongo/user/user-mongo-repository'

export const makeDbLoadUserById = (): DbLoadUserById => {
  return new DbLoadUserById(new UserMongoRepository())
}
