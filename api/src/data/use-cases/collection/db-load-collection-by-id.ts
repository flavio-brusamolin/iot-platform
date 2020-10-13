import { Collection } from '../../../domain/models/collection'
import { LoadCollectionById } from '../../../domain/use-cases/collection/load-collection-by-id'
import { LoadCollectionByIdRepository } from '../../protocols/db/collection/load-collection-by-id-repository'

export class DbLoadCollectionById implements LoadCollectionById {
  public constructor (private readonly loadCollectionByIdRepository: LoadCollectionByIdRepository) {}

  public async load (id: string): Promise<Collection> {
    return await this.loadCollectionByIdRepository.loadById(id)
  }
}
