import { Role } from '../enums/role'

export interface Team {
  id: string
  members: [{
    userId: string
    role: Role
  }]
}
