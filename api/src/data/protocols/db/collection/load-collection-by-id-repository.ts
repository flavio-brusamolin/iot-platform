import { Collection } from '../../../../domain/models/collection'

export interface LoadCollectionByIdRepository {
  loadById: (id: string) => Promise<Collection>
}
