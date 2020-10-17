import { DbAddVariable } from '../../../../data/use-cases/variable/db-add-variable'
import { VariableMongoRepository } from '../../../../infra/db/mongo/variable/variable-mongo-repository'

export const makeDbAddVariable = (): DbAddVariable => {
  return new DbAddVariable(new VariableMongoRepository(), new VariableMongoRepository())
}
