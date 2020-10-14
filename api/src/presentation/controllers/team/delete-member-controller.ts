import { Role } from '../../../domain/enums/role'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { DeleteMember } from '../../../domain/use-cases/team/delete-member'
import { LoadTeamById } from '../../../domain/use-cases/team/load-team-by-id'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class DeleteMemberController implements Controller {
  public constructor (
    private readonly loadTeamById: LoadTeamById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly deleteMember: DeleteMember
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { teamId, memberId } = httpRequest.params

      const team = await this.loadTeamById.load(teamId)
      if (!team) {
        return notFound(new ResourceNotFoundError('team id'))
      }

      const hasPermission = await this.checkMemberPermission.check(teamId, userId, [Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const updatedTeam = await this.deleteMember.delete(teamId, memberId)
      if (!updatedTeam) {
        return notFound(new ResourceNotFoundError('member id'))
      }

      return ok(updatedTeam)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
