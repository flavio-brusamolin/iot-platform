import { DbAddMember } from '../../../../data/use-cases/team/db-add-member'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbAddMember = (): DbAddMember => {
  return new DbAddMember(new TeamMongoRepository(), new TeamMongoRepository())
}
