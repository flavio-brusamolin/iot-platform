import { Variable } from '../../models/variable'

export interface LoadVariables {
  load: (deviceId: string) => Promise<Variable[]>
}
