import { Role } from '../../../domain/enums/role'
import { LoadTeamById } from '../../../domain/use-cases/team/load-team-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadUserByEmail } from '../../../domain/use-cases/user/load-user-by-email'
import { AddMember } from '../../../domain/use-cases/team/add-member'
import { badRequest, conflict, created, forbidden, notFound, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'
import { DuplicateTeamMemberError, ResourceNotFoundError } from '../../errors'

interface AddMemberContract {
    email: string
    role: Role
}

export class AddMemberController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly loadTeamById: LoadTeamById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly loadUserByEmail: LoadUserByEmail,
    private readonly addMember: AddMember
  ) {}

  public async handle (httpRequest: HttpRequest<AddMemberContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { teamId } = httpRequest.params
      const { email, role } = httpRequest.body

      const team = await this.loadTeamById.load(teamId)
      if (!team) {
        return notFound(new ResourceNotFoundError('team id'))
      }

      const hasPermission = await this.checkMemberPermission.check(teamId, userId, [Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const user = await this.loadUserByEmail.load(email)
      if (!user) {
        return notFound(new ResourceNotFoundError('email'))
      }

      const updatedTeam = await this.addMember.add(teamId, {
        userId: user.id,
        role
      })
      if (!updatedTeam) {
        return conflict(new DuplicateTeamMemberError(email))
      }

      return created(updatedTeam)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
