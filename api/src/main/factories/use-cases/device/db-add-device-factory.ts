import { DbAddDevice } from '../../../../data/use-cases/device/db-add-device'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbAddDevice = (): DbAddDevice => {
  return new DbAddDevice(new DeviceMongoRepository())
}
