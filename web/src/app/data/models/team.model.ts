import { Role } from '../enums'

export interface Member {
  name: string
  email: string
  userId: string
  role: Role
}

export interface Team {
  id: string
  members: Member[]
}
