import { User } from '../../domain/models/user'
import { AddUser, AddUserModel } from '../../domain/use-cases/add-user'
import { LoadUserByEmailRepository } from '../protocols/db/load-user-by-email-repository'
import { Encrypter } from '../protocols/criptography/encrypter'
import { AddUserRepository } from '../protocols/db/add-user-repository'

export class DbAddUser implements AddUser {
  public constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly addUserRepository: AddUserRepository
  ) {}

  public async add (userData: AddUserModel): Promise<User> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (user) {
      return null
    }

    const encryptedPassword = await this.encrypter.encrypt(userData.password)

    const newUser = await this.addUserRepository.add({
      ...userData,
      password: encryptedPassword
    })

    return newUser
  }
}
