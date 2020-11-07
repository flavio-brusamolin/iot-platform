import { Device } from '../../../../domain/models/device'

export interface LoadDevicesByBrokerIdRepository {
  loadByBrokerId: (brokerId: string) => Promise<Device[]>
}
