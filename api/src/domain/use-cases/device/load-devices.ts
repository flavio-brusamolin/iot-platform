import { Device } from '../../models/device'

export interface LoadDevices {
  load: (collectionId: string) => Promise<Device[]>
}
