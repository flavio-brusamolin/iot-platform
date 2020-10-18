import { Variable } from '../../../../domain/models/variable'

export interface LoadVariablesRepository {
  load: (deviceId: string) => Promise<Variable[]>
}
