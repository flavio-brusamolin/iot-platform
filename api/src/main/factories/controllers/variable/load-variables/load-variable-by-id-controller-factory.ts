import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadVariableById } from '../../../use-cases/variable/db-load-variable-by-id-factory'
import { LoadVariableByIdController } from '../../../../../presentation/controllers/variable/load-variable-by-id-controller'

export const makeLoadVariableByIdController = (): LoadVariableByIdController => {
  return new LoadVariableByIdController(
    makeDbLoadVariableById(),
    makeDbCheckMemberPermission()
  )
}
