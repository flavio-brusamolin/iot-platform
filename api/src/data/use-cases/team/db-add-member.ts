import { Team } from '../../../domain/models/team'
import { AddMember, AddMemberModel } from '../../../domain/use-cases/team/add-member'
import { AddMemberRepository } from '../../protocols/db/team/add-member-repository'
import { LoadMemberByIdRepository } from '../../protocols/db/team/load-member-by-id-repository'

export class DbAddMember implements AddMember {
  public constructor (
    private readonly loadMemberByIdRepository: LoadMemberByIdRepository,
    private readonly addMemberRepository: AddMemberRepository
  ) {}

  public async add (teamId: string, memberData: AddMemberModel): Promise<Team> {
    const member = await this.loadMemberByIdRepository.loadMemberById(teamId, memberData.userId)
    if (member) {
      return null
    }

    return await this.addMemberRepository.addMember(teamId, memberData)
  }
}
