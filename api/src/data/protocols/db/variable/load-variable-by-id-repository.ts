import { Variable } from '../../../../domain/models/variable'

export interface LoadVariableByIdRepository {
  loadById: (variableId: string) => Promise<Variable>
}
