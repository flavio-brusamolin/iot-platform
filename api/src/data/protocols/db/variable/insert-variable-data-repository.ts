import { Data, Variable } from '../../../../domain/models/variable'

export interface InsertVariableDataRepository {
  insertData: (variableId: string, data: Data) => Promise<Variable>
}
