import { MongoTeam } from './team-mongo-model'
import { Team } from '../../../../domain/models/team'

export default {
  toEntity: ({ _id, members }: MongoTeam): Team => ({
    id: _id.toString(),
    members: members.map(({ userId, role }) => ({ userId: userId.toString(), role }))
  })
}
