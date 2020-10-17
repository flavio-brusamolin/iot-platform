import { MongoVariable } from './variable-mongo-model'
import { Variable } from '../../../../domain/models/variable'

export default {
  toEntity: ({ _id, deviceId, accessGroupId, name, key, data }: MongoVariable): Variable => ({
    id: _id.toString(),
    deviceId: deviceId.toString(),
    accessGroupId: accessGroupId.toString(),
    name,
    key,
    data
  })
}
