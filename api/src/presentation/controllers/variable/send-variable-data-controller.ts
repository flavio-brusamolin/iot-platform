import { Role } from '../../../domain/enums/role'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { SendData } from '../../../domain/use-cases/mqtt/send-data'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadVariableById } from '../../../domain/use-cases/variable/load-variable-by-id'
import { BrokerStatusNotAcceptedError, ResourceNotFoundError } from '../../errors'
import { badRequest, forbidden, noContent, notFound, serverError, unprocessableEntity } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface SendVariableDataContract {
  value: number
}

export class SendVariableDataController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly loadVariableById: LoadVariableById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly loadDeviceById: LoadDeviceById,
    private readonly sendData: SendData
  ) {}

  public async handle (httpRequest: HttpRequest<SendVariableDataContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { variableId } = httpRequest.params
      const { value } = httpRequest.body

      const variable = await this.loadVariableById.load(variableId)
      if (!variable) {
        return notFound(new ResourceNotFoundError('variable id'))
      }

      const hasPermission = await this.checkMemberPermission.check(variable.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const device = await this.loadDeviceById.load(variable.deviceId)

      const success = await this.sendData.send(device, variable, value)
      if (success === null) {
        return unprocessableEntity(new BrokerStatusNotAcceptedError())
      }

      return noContent()
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
