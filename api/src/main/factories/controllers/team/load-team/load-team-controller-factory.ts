import { LoadTeamController } from '../../../../../presentation/controllers/team/load-team-controller'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadTeamById } from '../../../use-cases/team/db-load-team-by-id-factory'

export const makeLoadTeamController = (): LoadTeamController => {
  return new LoadTeamController(makeDbLoadTeamById(), makeDbCheckMemberPermission())
}
