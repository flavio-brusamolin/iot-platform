import { Team } from '../../../../domain/models/team'
import { AddMemberModel } from '../../../../domain/use-cases/team/add-member'

export interface AddMemberRepository {
  addMember: (teamId: string, memberData: AddMemberModel) => Promise<Team>
}
