import { Collection } from '../../../../domain/models/collection'
import { MongoCollection } from './collection-mongo-model'

export default {
  toEntity: ({ _id, accessGroupId, name }: MongoCollection): Collection => ({
    id: _id.toString(),
    accessGroupId: accessGroupId.toString(),
    name
  })
}
