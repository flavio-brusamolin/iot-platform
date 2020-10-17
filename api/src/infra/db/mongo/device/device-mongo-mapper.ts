import { MongoDevice } from './device-mongo-model'
import { Device } from '../../../../domain/models/device'

export default {
  toEntity: ({ _id, collectionId, accessGroupId, name, protocol, mqttInfo: { topic, brokerId } }: MongoDevice): Device => ({
    id: _id.toString(),
    collectionId: collectionId.toString(),
    accessGroupId: accessGroupId.toString(),
    name,
    protocol,
    mqttInfo: {
      topic,
      brokerId: brokerId.toString()
    }
  })
}
