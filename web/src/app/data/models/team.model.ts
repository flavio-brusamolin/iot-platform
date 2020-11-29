import { Role } from '../enums'

export interface Member {
  userId: string
  role: Role
}

export interface Team {
  id: string
  members: Member[]
}

export interface CompleteMemberData {
  id: string
  name: string
  email: string
  role: Role
}

export interface CompleteTeamData {
  id: string
  members: CompleteMemberData[]
}
