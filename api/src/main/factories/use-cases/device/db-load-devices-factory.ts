import { DbLoadDevices } from '../../../../data/use-cases/device/db-load-devices'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbLoadDevices = (): DbLoadDevices => {
  return new DbLoadDevices(new DeviceMongoRepository())
}
