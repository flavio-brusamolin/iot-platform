import { DbLoadTeams } from '../../../../data/use-cases/team/db-load-teams'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbLoadTeams = (): DbLoadTeams => {
  return new DbLoadTeams(new TeamMongoRepository())
}
