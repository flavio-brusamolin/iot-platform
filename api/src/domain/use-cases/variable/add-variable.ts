import { Variable } from '../../models/variable'

export interface AddVariableModel {
  deviceId: string
  accessGroupId: string
  name: string
  key: string
}

export interface AddVariable {
  add: (variableData: AddVariableModel) => Promise<Variable>
}
