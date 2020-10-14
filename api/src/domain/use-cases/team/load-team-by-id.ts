import { Role } from '../../enums/role'

interface CompleteMemberData {
  id: string
  name: string
  email: string
  role: Role
}

export interface CompleteTeamData {
  id: string
  members: CompleteMemberData[]
}

export interface LoadTeamById {
  load: (teamId: string) => Promise<CompleteTeamData>
}
