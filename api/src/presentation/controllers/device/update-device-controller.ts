import { Protocol } from '../../../domain/enums/protocol'
import { Role } from '../../../domain/enums/role'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { ResourceNotFoundError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'
import { UpdateDevice } from '../../../domain/use-cases/device/update-device'

interface UpdateDeviceContract {
    name?: string
    protocol?: Protocol
    mqttInfo?: {
      topic: string
      brokerId: string
    }
  }

export class UpdateDeviceController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly loadDeviceById: LoadDeviceById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly updateDevice: UpdateDevice
  ) {}

  public async handle (httpRequest: HttpRequest<UpdateDeviceContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { deviceId } = httpRequest.params

      const request = httpRequest.body

      const device = await this.loadDeviceById.load(deviceId)
      if (!device) {
        return notFound(new ResourceNotFoundError('device id'))
      }

      const { accessGroupId } = device

      const hasPermission = await this.checkMemberPermission.check(accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const updatedDevice = await this.updateDevice.update(deviceId, request)

      return ok(updatedDevice)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
