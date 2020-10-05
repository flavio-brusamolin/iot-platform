import { AddCollectionModel } from '../../../../domain/use-cases/collection/add-collection'
import { Collection } from '../../../../domain/models/collection'

export interface AddCollectionRepository {
  add: (collectionData: AddCollectionModel) => Promise<Collection>
}
