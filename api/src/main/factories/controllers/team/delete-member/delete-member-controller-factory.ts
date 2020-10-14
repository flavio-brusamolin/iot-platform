import { DeleteMemberController } from '../../../../../presentation/controllers/team/delete-member-controller'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbDeleteMember } from '../../../use-cases/team/db-delete-member-factory'
import { makeDbLoadTeamById } from '../../../use-cases/team/db-load-team-by-id-factory'

export const makeDeleteMemberController = (): DeleteMemberController => {
  return new DeleteMemberController(
    makeDbLoadTeamById(),
    makeDbCheckMemberPermission(),
    makeDbDeleteMember()
  )
}
