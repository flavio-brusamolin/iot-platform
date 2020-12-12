import { Device } from '../../models/device'
import { Variable } from '../../models/variable'

export interface SendData {
  send: (device: Device, variable: Variable, value: number) => Promise<void>
}
