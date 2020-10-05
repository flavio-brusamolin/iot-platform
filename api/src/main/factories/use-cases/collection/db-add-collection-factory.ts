import { DbAddCollection } from '../../../../data/use-cases/collection/db-add-collection'
import { CollectionMongoRepository } from '../../../../infra/db/mongo/collection/collection-mongo-repository'

export const makeDbAddCollection = (): DbAddCollection => {
  return new DbAddCollection(new CollectionMongoRepository())
}
