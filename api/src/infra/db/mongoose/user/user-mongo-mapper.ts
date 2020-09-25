import { User } from '../../../../domain/models/user'

const UserMongoMapper = {
  toEntity: ({ _id, name, email, password }: any): User => ({
    id: _id,
    name,
    email,
    password
  })
}

export default UserMongoMapper
