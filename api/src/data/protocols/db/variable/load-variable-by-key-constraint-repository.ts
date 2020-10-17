import { Variable } from '../../../../domain/models/variable'

export interface KeyConstraint {
  key: string
  deviceId: string
}

export interface LoadVariableByKeyConstraintRepository {
  loadByKeyConstraint: (keyConstraint: KeyConstraint) => Promise<Variable>
}
