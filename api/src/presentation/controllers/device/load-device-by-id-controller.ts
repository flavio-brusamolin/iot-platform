import { Role } from '../../../domain/enums/role'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { ResourceNotFoundError } from '../../errors'
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadDeviceByIdController implements Controller {
  public constructor (
    private readonly loadDeviceById: LoadDeviceById,
    private readonly checkMemberPermission: CheckMemberPermission
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { deviceId } = httpRequest.params

      const device = await this.loadDeviceById.load(deviceId)
      if (!device) {
        return notFound(new ResourceNotFoundError('device id'))
      }

      const hasPermission = await this.checkMemberPermission.check(device.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      return ok(device)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
