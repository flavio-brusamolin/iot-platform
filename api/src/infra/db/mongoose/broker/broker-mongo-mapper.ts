import { Broker } from '../../../../domain/models/broker'

export default {
  toEntity: ({ _id, userId, name, credentials }: any): Broker => ({
    id: _id,
    userId,
    name,
    credentials
  })
}
