import { DbValidateProtocolRules } from '../../../../data/use-cases/device/db-validate-protocol-rules'
import { DeviceMongoRepository } from '../../../../infra/db/mongo/device/device-mongo-repository'

export const makeDbValidateProtocolRules = (): DbValidateProtocolRules => {
  return new DbValidateProtocolRules(new DeviceMongoRepository())
}
