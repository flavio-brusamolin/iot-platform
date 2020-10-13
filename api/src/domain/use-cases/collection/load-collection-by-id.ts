import { Collection } from '../../models/collection'

export interface LoadCollectionById {
  load: (id: string) => Promise<Collection>
}
