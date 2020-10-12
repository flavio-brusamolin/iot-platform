import { Team } from '../../../../domain/models/team'

export interface DeleteMemberRepository {
  deleteMember: (teamId: string, memberId: string) => Promise<Team>
}
