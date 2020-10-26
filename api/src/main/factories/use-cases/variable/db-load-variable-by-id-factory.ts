import { DbLoadVariableById } from '../../../../data/use-cases/variable/db-load-variable-by-id'
import { VariableMongoRepository } from '../../../../infra/db/mongo/variable/variable-mongo-repository'

export const makeDbLoadVariableById = (): DbLoadVariableById => {
  return new DbLoadVariableById(new VariableMongoRepository())
}
