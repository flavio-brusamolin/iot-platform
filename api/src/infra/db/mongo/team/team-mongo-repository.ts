import { isValidObjectId } from 'mongoose'
import TeamMongoSchema from './team-mongo-schema'
import TeamMongoMapper from './team-mongo-mapper'
import UserMongoMapper from '../user/user-mongo-mapper'
import { AddTeamModel, AddTeamRepository } from '../../../../data/protocols/db/team/add-team-repository'
import { FullTeam, Member, Team } from '../../../../domain/models/team'
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

  public async loadById (id: string): Promise<FullTeam> {
    if (!isValidObjectId(id)) {
      return null
    }

    const teamRecord = await TeamMongoSchema
      .findById(id)
      .populate({ path: 'members.userId', select: '-password' })

    if (!teamRecord) {
      return null
    }

    const members = teamRecord.members.map(({ userId, role }) => ({
      ...UserMongoMapper.toEntity(userId),
      role
    }))

    return {
      ...TeamMongoMapper.toEntity(teamRecord),
      members
    }
  }

  public async loadMemberById (teamId: string, memberId: string): Promise<Member> {
    const teamRecord = await TeamMongoSchema
      .findById(teamId)
      .select({ members: { $elemMatch: { userId: memberId } } })

    const { members } = TeamMongoMapper.toEntity(teamRecord)
    return members[0] ?? null
  }

  public async addMember (teamId: string, memberData: AddMemberModel): Promise<Team> {
    const teamRecord = await TeamMongoSchema.findByIdAndUpdate(
      teamId,
      { $push: { members: memberData } },
      { new: true }
    )

    return TeamMongoMapper.toEntity(teamRecord)
  }
}
