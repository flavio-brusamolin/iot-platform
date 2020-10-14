import { Role } from '../enums/role'

export interface Member {
  userId: string
  role: Role
}

export interface Team {
  id: string
  members: Member[]
}
