import { DbLoadVariables } from '../../../../data/use-cases/variable/db-load-variables'
import { VariableMongoRepository } from '../../../../infra/db/mongo/variable/variable-mongo-repository'

export const makeDbLoadVariables = (): DbLoadVariables => {
  return new DbLoadVariables(new VariableMongoRepository())
}
