import { Member } from '../../../../domain/models/team'

export interface LoadMemberByIdRepository {
  loadMemberById: (teamId: string, memberId: string) => Promise<Member>
}
