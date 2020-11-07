import { DeviceBusinessRulesValidator } from '../../../../data/use-cases/device/device-business-rules-validator'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDeviceBusinessRulesValidator = (): DeviceBusinessRulesValidator => {
  return new DeviceBusinessRulesValidator(new BrokerMongoRepository(), new DeviceMongoRepository())
}
