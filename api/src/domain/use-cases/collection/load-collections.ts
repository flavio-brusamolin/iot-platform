import { Collection } from '../../models/collection'

export interface LoadCollections {
  load: (accessGroupIds: string[]) => Promise<Collection[]>
}
