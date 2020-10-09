import TeamMongoSchema from './team-mongo-schema'
import TeamMongoMapper from './team-mongo-mapper'
import { AddTeamModel, AddTeamRepository } from '../../../../data/protocols/db/team/add-team-repository'
import { Member, Team } from '../../../../domain/models/team'
import { LoadTeamsRepository } from '../../../../data/protocols/db/team/load-teams-repository'
import { LoadTeamByIdRepository } from '../../../../data/protocols/db/team/load-team-by-id-repository'
import { LoadMemberByIdRepository } from '../../../../data/protocols/db/team/load-member-by-id-repository'
import { AddMemberRepository } from '../../../../data/protocols/db/team/add-member-repository'
import { AddMemberModel } from '../../../../domain/use-cases/team/add-member'

export class TeamMongoRepository implements AddTeamRepository, LoadTeamsRepository, LoadTeamByIdRepository, LoadMemberByIdRepository, AddMemberRepository {
  public async add (teamData: AddTeamModel): Promise<Team> {
    const teamRecord = await TeamMongoSchema.create(teamData)
    return TeamMongoMapper.toEntity(teamRecord)
  }

  public async load (userId: string): Promise<Team[]> {
    const teamRecords = await TeamMongoSchema.find({ 'members.userId': userId })
    return teamRecords.map(TeamMongoMapper.toEntity)
  }

  public async loadById (id: string): Promise<Team> {
    const teamRecord = await TeamMongoSchema.findById(id)
    return teamRecord && TeamMongoMapper.toEntity(teamRecord)
  }

  public async loadMemberById (teamId: string, memberId: string): Promise<Member> {
    const member = await TeamMongoSchema.findOne({
      id: teamId,
      'members.userId': memberId
    })

    return member.toObject() // check if mappers can be replaced for toObject method
  }

  public async addMember (teamId: string, memberData: AddMemberModel): Promise<Team> {
    const team = await TeamMongoSchema.findByIdAndUpdate(
      teamId,
      { $push: { members: memberData } },
      { new: true }
    )

    return TeamMongoMapper.toEntity(team)
  }
}
