import { MongoBroker } from './broker-mongo-model'
import { Broker } from '../../../../domain/models/broker'

export default {
  toEntity: ({ _id, userId, name, credentials }: MongoBroker): Broker => ({
    id: _id.toString(),
    userId: userId.toString(),
    name,
    credentials
  })
}
