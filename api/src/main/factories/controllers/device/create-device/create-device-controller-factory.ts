import { CreateDeviceController } from '../../../../../presentation/controllers/device/create-device-controller'
import { makeCreateDeviceValidator } from './create-device-validator-factory'
import { makeDbLoadCollectionById } from '../../../use-cases/collection/db-load-collection-by-id-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadBrokerById } from '../../../use-cases/broker/db-load-broker-by-id-factory'
import { makeDbAddDevice } from '../../../use-cases/device/db-add-device-factory'
import { makeDeviceBusinessRulesValidator } from '../../../use-cases/device/device-business-rules-validator-factory'

export const makeCreateDeviceController = (): CreateDeviceController => {
  return new CreateDeviceController(
    makeCreateDeviceValidator(),
    makeDbLoadCollectionById(),
    makeDbCheckMemberPermission(),
    makeDbLoadBrokerById(),
    makeDeviceBusinessRulesValidator(),
    makeDbAddDevice()
  )
}
