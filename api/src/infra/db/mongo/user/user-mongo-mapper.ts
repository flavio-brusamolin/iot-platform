import { User } from '../../../../domain/models/user'

export default {
  toEntity: ({ _id, name, email, password }: any): User => ({
    id: _id,
    name,
    email,
    password
  })
}
