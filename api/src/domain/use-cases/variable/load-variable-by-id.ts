import { Variable } from '../../models/variable'

export interface LoadVariableById {
  load: (variableId: string) => Promise<Variable>
}
