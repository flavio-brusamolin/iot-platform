import { Collection } from '../../../domain/models/collection'
import { AddCollection, AddCollectionModel } from '../../../domain/use-cases/collection/add-collection'
import { AddCollectionRepository } from '../../protocols/db/collection/add-collection-repository'

export class DbAddCollection implements AddCollection {
  public constructor (private readonly addCollectionRepository: AddCollectionRepository) {}

  public async add (collectionData: AddCollectionModel): Promise<Collection> {
    return await this.addCollectionRepository.add(collectionData)
  }
}
