import { Collection } from '../../models/collection'

export interface LoadCollections {
  load: (collectionId: string) => Promise<Collection[]>
}
