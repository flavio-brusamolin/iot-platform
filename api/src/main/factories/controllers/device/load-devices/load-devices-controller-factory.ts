import { makeDbLoadCollectionById } from '../../../use-cases/collection/db-load-collection-by-id-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { LoadDevicesController } from '../../../../../presentation/controllers/device/load-devices-controller'
import { makeDbLoadDevices } from '../../../use-cases/device/db-load-devices-factory'

export const makeLoadDevicesController = (): LoadDevicesController => {
  return new LoadDevicesController(
    makeDbLoadCollectionById(),
    makeDbCheckMemberPermission(),
    makeDbLoadDevices()
  )
}
