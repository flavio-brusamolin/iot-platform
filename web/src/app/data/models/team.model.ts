import { Role } from '../enums'

export interface Member {
  userId: string
  role: Role
}

export interface Team {
  id: string
  members: Member[]
}
