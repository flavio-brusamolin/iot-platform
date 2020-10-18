import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadDeviceById } from '../../../use-cases/device/db-load-device-by-id-factory'
import { LoadVariablesController } from '../../../../../presentation/controllers/variable/load-variables-controller'
import { makeDbLoadVariables } from '../../../use-cases/variable/db-load-variables-factory'

export const makeLoadVariablesController = (): LoadVariablesController => {
  return new LoadVariablesController(
    makeDbLoadDeviceById(),
    makeDbCheckMemberPermission(),
    makeDbLoadVariables()
  )
}
