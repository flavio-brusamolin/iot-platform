import { Role } from '../../../domain/enums/role'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadVariableById } from '../../../domain/use-cases/variable/load-variable-by-id'
import { ResourceNotFoundError } from '../../errors'
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadVariableByIdController implements Controller {
  public constructor (
    private readonly loadVariableById: LoadVariableById,
    private readonly checkMemberPermission: CheckMemberPermission
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { variableId } = httpRequest.params
      const { expand } = httpRequest.query

      const variable = await this.loadVariableById.load(variableId, expand)
      if (!variable) {
        return notFound(new ResourceNotFoundError('variable id'))
      }

      const hasPermission = await this.checkMemberPermission.check(variable.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      return ok(variable)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
