import { Device } from '../../../../domain/models/device'

export interface LoadDevicesRepository {
  load: (collectionId: string) => Promise<Device[]>
}
