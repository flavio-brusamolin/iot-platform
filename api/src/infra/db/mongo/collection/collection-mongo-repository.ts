import CollectionMongoSchema from './collection-mongo-schema'
import CollectionMongoMapper from './collection-mongo-mapper'
import { AddCollectionRepository } from '../../../../data/protocols/db/collection/add-collection-repository'
import { AddCollectionModel } from '../../../../domain/use-cases/collection/add-collection'
import { Collection } from '../../../../domain/models/collection'

export class CollectionMongoRepository implements AddCollectionRepository {
  public async add (collectionData: AddCollectionModel): Promise<Collection> {
    const collectionRecord = await CollectionMongoSchema.create(collectionData)
    return CollectionMongoMapper.toEntity(collectionRecord)
  }
}
