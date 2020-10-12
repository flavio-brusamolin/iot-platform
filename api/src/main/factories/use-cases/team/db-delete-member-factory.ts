import { DbDeleteMember } from '../../../../data/use-cases/team/db-delete-member'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbDeleteMember = (): DbDeleteMember => {
  return new DbDeleteMember(new TeamMongoRepository(), new TeamMongoRepository())
}
