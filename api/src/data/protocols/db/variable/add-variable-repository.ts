import { AddVariableModel } from '../../../../domain/use-cases/variable/add-variable'
import { Variable } from '../../../../domain/models/variable'

export interface AddVariableRepository {
  add: (variableData: AddVariableModel) => Promise<Variable>
}
