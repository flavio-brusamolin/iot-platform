import { Team } from '../../../../domain/models/team'

export default {
  toEntity: ({ _id, members }: any): Team => ({
    id: _id,
    members
  })
}
