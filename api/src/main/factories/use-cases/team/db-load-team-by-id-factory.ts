import { DbLoadTeamById } from '../../../../data/use-cases/team/db-load-team-by-id'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbLoadTeamById = (): DbLoadTeamById => {
  return new DbLoadTeamById(new TeamMongoRepository())
}
