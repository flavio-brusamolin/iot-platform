import { Role } from '../../../../domain/enums/role'
import { Team } from '../../../../domain/models/team'

export interface AddTeamModel {
  members: [{
    userId: string
    role: Role
  }]
}

export interface AddTeamRepository {
  add: (teamData: AddTeamModel) => Promise<Team>
}
