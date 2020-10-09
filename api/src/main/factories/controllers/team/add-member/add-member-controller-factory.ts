import { AddMemberController } from '../../../../../presentation/controllers/team/add-member-controller'
import { makeDbAddMember } from '../../../use-cases/team/db-add-member-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadTeamById } from '../../../use-cases/team/db-load-team-by-id-factory'
import { makeDbLoadUserByEmail } from '../../../use-cases/user/db-load-user-by-email-factory'
import { makeAddMemberValidator } from './add-member-validator-factory'

export const makeAddMemberController = (): AddMemberController => {
  return new AddMemberController(
    makeAddMemberValidator(),
    makeDbLoadTeamById(),
    makeDbCheckMemberPermission(),
    makeDbLoadUserByEmail(),
    makeDbAddMember()
  )
}
