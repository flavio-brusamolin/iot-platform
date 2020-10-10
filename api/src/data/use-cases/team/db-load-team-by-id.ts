// import { Team } from '../../../domain/models/team'
import { FullTeam } from '../../../domain/models/team'
import { LoadTeamById } from '../../../domain/use-cases/team/load-team-by-id'
import { LoadTeamByIdRepository } from '../../protocols/db/team/load-team-by-id-repository'

export class DbLoadTeamById implements LoadTeamById {
  public constructor (private readonly loadTeamByIdRepository: LoadTeamByIdRepository) {}

  public async load (teamId: string): Promise<FullTeam> {
    return await this.loadTeamByIdRepository.loadById(teamId)
  }
}
