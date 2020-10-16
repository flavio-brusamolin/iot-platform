import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { UpdateDeviceController } from '../../../../../presentation/controllers/device/update-device-controller'
import { makeDbLoadDeviceById } from '../../../use-cases/device/db-load-device-by-id-factory'
import { makeDbUpdateDevice } from '../../../use-cases/device/db-update-device-factory'
import { makeUpdateDeviceValidator } from './update-device-validator-factory'

export const makeUpdateDeviceController = (): UpdateDeviceController => {
  return new UpdateDeviceController(
    makeUpdateDeviceValidator(),
    makeDbLoadDeviceById(),
    makeDbCheckMemberPermission(),
    makeDbUpdateDevice()
  )
}
