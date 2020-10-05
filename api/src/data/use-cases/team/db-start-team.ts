import { Role } from '../../../domain/enums/role'
import { Team } from '../../../domain/models/team'
import { StartTeam } from '../../../domain/use-cases/team/start-team'
import { AddTeamRepository } from '../../protocols/db/team/add-team-repository'

export class DbStartTeam implements StartTeam {
  public constructor (private readonly addTeamRepository: AddTeamRepository) {}

  public async start (userId: string): Promise<Team> {
    const team = await this.addTeamRepository.add({
      members: [{
        userId,
        role: Role.ADVANCED
      }]
    })

    return team
  }
}
