import { LoadCollectionsController } from '../../../../../presentation/controllers/collection/load-collections-controller'
import { makeDbLoadTeams } from '../../../use-cases/team/db-load-teams-factory'
import { makeDbLoadCollections } from '../../../use-cases/collection/db-load-collections-factory'

export const makeLoadCollectionsController = (): LoadCollectionsController => {
  return new LoadCollectionsController(makeDbLoadTeams(), makeDbLoadCollections())
}
