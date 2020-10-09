import { DbCheckMemberPermission } from '../../../../data/use-cases/team/db-check-member-permission'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbCheckMemberPermission = (): DbCheckMemberPermission => {
  return new DbCheckMemberPermission(new TeamMongoRepository())
}
