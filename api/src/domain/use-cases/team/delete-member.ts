import { Team } from '../../models/team'

export interface DeleteMember {
  delete: (teamId: string, memberId: string) => Promise<Team>
}
