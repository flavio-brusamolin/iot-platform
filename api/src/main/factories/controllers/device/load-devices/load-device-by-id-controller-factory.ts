import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadDeviceById } from '../../../use-cases/device/db-load-device-by-id-factory'
import { LoadDeviceByIdController } from '../../../../../presentation/controllers/device/load-device-by-id-controller'

export const makeLoadDeviceByIdController = (): LoadDeviceByIdController => {
  return new LoadDeviceByIdController(
    makeDbLoadDeviceById(),
    makeDbCheckMemberPermission()
  )
}
