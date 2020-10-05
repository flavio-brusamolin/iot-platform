import { DbStartTeam } from '../../../../data/use-cases/team/db-start-team'
import { TeamMongoRepository } from '../../../../infra/db/mongo/team/team-mongo-repository'

export const makeDbStartTeam = (): DbStartTeam => {
  return new DbStartTeam(new TeamMongoRepository())
}
