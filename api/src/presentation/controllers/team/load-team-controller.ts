import { Role } from '../../../domain/enums/role'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadTeamById } from '../../../domain/use-cases/team/load-team-by-id'
import { ResourceNotFoundError } from '../../errors'
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadTeamController implements Controller {
  public constructor (
    private readonly loadTeamById: LoadTeamById,
    private readonly checkMemberPermission: CheckMemberPermission
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { teamId } = httpRequest.params

      const team = await this.loadTeamById.load(teamId)
      if (!team) {
        return notFound(new ResourceNotFoundError('id'))
      }

      const hasPermission = await this.checkMemberPermission.check(teamId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      return ok(team)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
