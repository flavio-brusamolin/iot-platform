import { CreateVariableController } from '../../../../../presentation/controllers/variable/create-variable-controller'
import { makeCreateVariableValidator } from './create-variable-validator-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadDeviceById } from '../../../use-cases/device/db-load-device-by-id-factory'
import { makeDbAddVariable } from '../../../use-cases/variable/db-add-variable-factory'

export const makeCreateVariableController = (): CreateVariableController => {
  return new CreateVariableController(
    makeCreateVariableValidator(),
    makeDbLoadDeviceById(),
    makeDbCheckMemberPermission(),
    makeDbAddVariable()
  )
}
