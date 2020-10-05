import { Collection } from '../../../../domain/models/collection'

export default {
  toEntity: ({ _id, accessGroupId, name }: any): Collection => ({
    id: _id,
    accessGroupId,
    name
  })
}
