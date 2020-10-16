import { DbUpdateDevice } from '../../../../data/use-cases/device/db-update-device'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbUpdateDevice = (): DbUpdateDevice => {
  return new DbUpdateDevice(new DeviceMongoRepository())
}
