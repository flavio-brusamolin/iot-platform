import { DbLoadCollectionById } from '../../../../data/use-cases/collection/db-load-collection-by-id'
import { CollectionMongoRepository } from '../../../../infra/db/mongo/collection/collection-mongo-repository'

export const makeDbLoadCollectionById = (): DbLoadCollectionById => {
  return new DbLoadCollectionById(new CollectionMongoRepository())
}
