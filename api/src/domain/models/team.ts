import { Role } from '../enums/role'

export interface Member {
  userId: string
  role: Role
}

export interface Team {
  id: string
  members: Member[]
}

interface FullMember {
  id: string
  name: string
  email: string
  role: Role
}

export interface FullTeam {
  id: string
  members: FullMember[]
}
