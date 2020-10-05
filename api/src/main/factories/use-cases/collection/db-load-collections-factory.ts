import { DbLoadCollections } from '../../../../data/use-cases/collection/db-load-collections'
import { CollectionMongoRepository } from '../../../../infra/db/mongo/collection/collection-mongo-repository'

export const makeDbLoadCollections = (): DbLoadCollections => {
  return new DbLoadCollections(new CollectionMongoRepository())
}
