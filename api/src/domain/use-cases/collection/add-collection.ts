import { Collection } from '../../models/collection'

export interface AddCollectionModel {
  name: string
  accessGroupId: string
}

export interface AddCollection {
  add: (collectionData: AddCollectionModel) => Promise<Collection>
}
