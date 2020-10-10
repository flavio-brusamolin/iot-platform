import { MongoUser } from './user-mongo-model'
import { User } from '../../../../domain/models/user'

export default {
  toEntity: ({ _id, name, email, password }: MongoUser): User => ({
    id: _id.toString(),
    name,
    email,
    password
  })
}
