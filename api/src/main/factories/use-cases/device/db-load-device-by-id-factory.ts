import { DbLoadDeviceById } from '../../../../data/use-cases/device/db-load-device-by-id'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbLoadDeviceById = (): DbLoadDeviceById => {
  return new DbLoadDeviceById(new DeviceMongoRepository())
}
