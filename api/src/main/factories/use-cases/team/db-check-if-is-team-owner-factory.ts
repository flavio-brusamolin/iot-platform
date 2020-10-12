import { DbCheckIfIsTeamOwner } from '../../../../data/use-cases/team/db-check-if-is-team-owner'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbCheckIfIsTeamOwner = (): DbCheckIfIsTeamOwner => {
  return new DbCheckIfIsTeamOwner(new TeamMongoRepository())
}
