import { isValidObjectId } from 'mongoose'
import CollectionMongoSchema from './collection-mongo-schema'
import CollectionMongoMapper from './collection-mongo-mapper'
import { AddCollectionRepository } from '../../../../data/protocols/db/collection/add-collection-repository'
import { AddCollectionModel } from '../../../../domain/use-cases/collection/add-collection'
import { Collection } from '../../../../domain/models/collection'
import { LoadCollectionsRepository } from '../../../../data/protocols/db/collection/load-collections-repository'
import { LoadCollectionByIdRepository } from '../../../../data/protocols/db/collection/load-collection-by-id-repository'

export class CollectionMongoRepository implements AddCollectionRepository, LoadCollectionsRepository, LoadCollectionByIdRepository {
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

  public async loadById (id: string): Promise<Collection> {
    if (!isValidObjectId(id)) {
      return null
    }

    const collectionRecord = await CollectionMongoSchema.findById(id)
    return collectionRecord && CollectionMongoMapper.toEntity(collectionRecord)
  }
}
