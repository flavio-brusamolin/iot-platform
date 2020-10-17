import { Role } from '../../../domain/enums/role'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { AddVariable } from '../../../domain/use-cases/variable/add-variable'
import { DuplicateFieldError, ResourceNotFoundError } from '../../errors'
import { badRequest, conflict, created, forbidden, notFound, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface CreateVariableContract {
  name: string
  key: string
}

export class CreateVariableController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly loadDeviceById: LoadDeviceById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly addVariable: AddVariable
  ) {}

  public async handle (httpRequest: HttpRequest<CreateVariableContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { deviceId } = httpRequest.params
      const { name, key } = httpRequest.body

      const device = await this.loadDeviceById.load(deviceId)
      if (!device) {
        return notFound(new ResourceNotFoundError('device id'))
      }

      const { accessGroupId } = device

      const hasPermission = await this.checkMemberPermission.check(accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const variable = await this.addVariable.add({
        deviceId,
        accessGroupId,
        name,
        key
      })
      if (!variable) {
        return conflict(new DuplicateFieldError('key'))
      }

      return created(variable)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
