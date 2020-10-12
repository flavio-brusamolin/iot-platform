import { Team } from '../../../domain/models/team'
import { DeleteMember } from '../../../domain/use-cases/team/delete-member'
import { DeleteMemberRepository } from '../../protocols/db/team/delete-member-repository'
import { LoadMemberByIdRepository } from '../../protocols/db/team/load-member-by-id-repository'

export class DbDeleteMember implements DeleteMember {
  public constructor (
    private readonly loadMemberByIdRepository: LoadMemberByIdRepository,
    private readonly deleteMemberRepository: DeleteMemberRepository
  ) {}

  public async delete (teamId: string, memberId: string): Promise<Team> {
    const member = await this.loadMemberByIdRepository.loadMemberById(teamId, memberId)
    if (!member) {
      return null
    }

    return await this.deleteMemberRepository.deleteMember(teamId, memberId)
  }
}
