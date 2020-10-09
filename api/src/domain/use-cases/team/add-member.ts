import { Role } from '../../enums/role'
import { Team } from '../../models/team'

export interface AddMemberModel {
  userId: string
  role: Role
}

export interface AddMember {
  add: (teamId: string, memberData: AddMemberModel) => Promise<Team>
}
