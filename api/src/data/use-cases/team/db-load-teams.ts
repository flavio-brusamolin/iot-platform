import { Team } from '../../../domain/models/team'
import { LoadTeams } from '../../../domain/use-cases/team/load-teams'
import { LoadTeamsRepository } from '../../protocols/db/team/load-teams-repository'

export class DbLoadTeams implements LoadTeams {
  public constructor (private readonly loadTeamsRepository: LoadTeamsRepository) {}

  public async load (userId: string): Promise<Team[]> {
    return await this.loadTeamsRepository.load(userId)
  }
}
