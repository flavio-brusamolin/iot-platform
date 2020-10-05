import CollectionMongoSchema from './collection-mongo-schema'
import CollectionMongoMapper from './collection-mongo-mapper'
import { AddCollectionRepository } from '../../../../data/protocols/db/collection/add-collection-repository'
import { AddCollectionModel } from '../../../../domain/use-cases/collection/add-collection'
import { Collection } from '../../../../domain/models/collection'
import { LoadCollectionsRepository } from '../../../../data/protocols/db/collection/load-collections-repository'

export class CollectionMongoRepository implements AddCollectionRepository, LoadCollectionsRepository {
  public async add (collectionData: AddCollectionModel): Promise<Collection> {
    const collectionRecord = await CollectionMongoSchema.create(collectionData)
    return CollectionMongoMapper.toEntity(collectionRecord)
  }

  public async load (accessGroupIds: string[]): Promise<Collection[]> {
    const collectionRecords = await CollectionMongoSchema.find({
      accessGroupId: { $in: accessGroupIds }
    })

    return collectionRecords.map(CollectionMongoMapper.toEntity)
  }
}
