import { CreateCollectionController } from '../../../../../presentation/controllers/collection/create-collection-controller'
import { makeDbAddCollection } from '../../../use-cases/collection/db-add-collection-factory'
import { makeDbStartTeam } from '../../../use-cases/team/db-start-team-factory'
import { makeCreateCollectionValidator } from './create-collection-validator-factory'

export const makeCreateCollectionController = (): CreateCollectionController => {
  return new CreateCollectionController(makeCreateCollectionValidator(), makeDbStartTeam(), makeDbAddCollection())
}
