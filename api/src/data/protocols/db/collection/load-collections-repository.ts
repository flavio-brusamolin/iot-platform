import { Collection } from '../../../../domain/models/collection'

export interface LoadCollectionsRepository {
  load: (accessGroupIds: string[]) => Promise<Collection[]>
}
