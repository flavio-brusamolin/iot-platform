import { Collection } from '../../../domain/models/collection'
import { LoadCollections } from '../../../domain/use-cases/collection/load-collections'
import { LoadCollectionsRepository } from '../../protocols/db/collection/load-collections-repository'

export class DbLoadCollections implements LoadCollections {
  public constructor (private readonly loadCollectionsRepository: LoadCollectionsRepository) {}

  public async load (accessGroupIds: string[]): Promise<Collection[]> {
    return await this.loadCollectionsRepository.load(accessGroupIds)
  }
}
