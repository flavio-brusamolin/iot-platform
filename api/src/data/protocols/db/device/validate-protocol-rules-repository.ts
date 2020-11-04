import { Device } from '../../../../domain/models/device'

export interface ValidateProtocolRulesRepository {
  validate: (mqttInfo: any) => Promise<Device[]>
}
