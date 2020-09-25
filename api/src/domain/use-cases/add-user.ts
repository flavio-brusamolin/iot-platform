import { User } from '../models/user'

export interface AddUserModel {
  name: string
  email: string
  password: string
}

export interface AddUser {
  add: (userData: AddUserModel) => Promise<User>
}
