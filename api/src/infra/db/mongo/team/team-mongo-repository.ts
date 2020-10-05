import TeamMongoSchema from './team-mongo-schema'
import TeamMongoMapper from './team-mongo-mapper'
import { AddTeamModel, AddTeamRepository } from '../../../../data/protocols/db/team/add-team-repository'
import { Team } from '../../../../domain/models/team'
import { LoadTeamsRepository } from '../../../../data/protocols/db/team/load-teams-repository'

export class TeamMongoRepository implements AddTeamRepository, LoadTeamsRepository {
  public async add (teamData: AddTeamModel): Promise<Team> {
    const teamRecord = await TeamMongoSchema.create(teamData)
    return TeamMongoMapper.toEntity(teamRecord)
  }

  public async load (userId: string): Promise<Team[]> {
    const teamRecords = await TeamMongoSchema.find({ 'members.userId': userId })
    return teamRecords.map(TeamMongoMapper.toEntity)
  }
}
