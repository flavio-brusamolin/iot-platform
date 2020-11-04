import { MongoBroker } from './broker-mongo-model'
import { Broker } from '../../../../domain/models/broker'

export default {
  toEntity: ({ _id, userId, name, status, credentials }: MongoBroker): Broker => ({
    id: _id.toString(),
    userId: userId.toString(),
    name,
    status,
    credentials
  })
}
