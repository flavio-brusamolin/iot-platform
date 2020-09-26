import UserMongoSchema from './user-mongo-schema'
import UserMongoMapper from './user-mongo-mapper'
import { User } from '../../../../domain/models/user'
import { AddUserModel } from '../../../../domain/use-cases/add-user'
import { LoadUserByEmailRepository } from '../../../../data/protocols/db/load-user-by-email-repository'
import { AddUserRepository } from '../../../../data/protocols/db/add-user-repository'

export class UserMongoRepository implements LoadUserByEmailRepository, AddUserRepository {
  public async loadByEmail (email: string): Promise<User> {
    const userRecord = await UserMongoSchema.findOne({ email })
    return userRecord && UserMongoMapper.toEntity(userRecord)
  }

  public async add (userData: AddUserModel): Promise<User> {
    const userRecord = await UserMongoSchema.create(userData)
    return userRecord && UserMongoMapper.toEntity(userRecord)
  }
}
