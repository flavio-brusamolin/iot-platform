import { Role } from '../../../domain/enums/role'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadTeamByIdRepository } from '../../protocols/db/team/load-team-by-id-repository'

export class DbCheckMemberPermission implements CheckMemberPermission {
  public constructor (private readonly loadTeamByIdRepository: LoadTeamByIdRepository) {}

  public async check (teamId: string, memberId: string, allowedRoles: Role[]): Promise<boolean> {
    const { members } = await this.loadTeamByIdRepository.loadById(teamId)

    const member = members.find(({ userId, role }) => userId === memberId && allowedRoles.includes(role))
    return !!member
  }
}
