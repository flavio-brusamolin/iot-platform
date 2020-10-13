import { CheckIfIsTeamOwner } from '../../../domain/use-cases/team/check-if-is-team-owner'
import { LoadTeamByIdRepository } from '../../protocols/db/team/load-team-by-id-repository'

export class DbCheckIfIsTeamOwner implements CheckIfIsTeamOwner {
  public constructor (private readonly loadTeamByIdRepository: LoadTeamByIdRepository) {}

  public async check (teamId: string, memberId: string): Promise<boolean> {
    const team = await this.loadTeamByIdRepository.loadById(teamId)
    return team.members[0].id === memberId
  }
}
