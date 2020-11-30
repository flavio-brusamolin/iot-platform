import { LoadCollectionByIdController } from '../../../../../presentation/controllers/collection/load-collection-by-id-controller'
import { makeDbLoadCollectionById } from '../../../use-cases/collection/db-load-collection-by-id-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'

export const makeLoadCollectionByIdController = (): LoadCollectionByIdController => {
  return new LoadCollectionByIdController(makeDbCheckMemberPermission(), makeDbLoadCollectionById())
}
