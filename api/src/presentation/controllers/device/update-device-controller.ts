import { Protocol } from '../../../domain/enums/protocol'
import { Role } from '../../../domain/enums/role'
import { LoadDeviceById } from '../../../domain/use-cases/device/load-device-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { LoadBrokerById } from '../../../domain/use-cases/broker/load-broker-by-id'
import { ResourceNotFoundError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'
import { UpdateDevice } from '../../../domain/use-cases/device/update-device'
// import { BusinessRulesValidator } from '../../../domain/use-cases/validation/business-rules-validator'

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
    private readonly loadBrokerById: LoadBrokerById,
    // private readonly businessRulesValidator: BusinessRulesValidator,
    private readonly updateDevice: UpdateDevice
  ) {}

  public async handle (httpRequest: HttpRequest<UpdateDeviceContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId, body: deviceData } = httpRequest
      const { deviceId } = httpRequest.params

      const device = await this.loadDeviceById.load(deviceId)
      if (!device) {
        return notFound(new ResourceNotFoundError('device id'))
      }

      const hasPermission = await this.checkMemberPermission.check(device.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const { mqttInfo } = deviceData

      if (mqttInfo) {
        const broker = await this.loadBrokerById.load(mqttInfo.brokerId, userId)

        if (!broker) {
          return notFound(new ResourceNotFoundError('broker id'))
        }

        // const businessError = await this.businessRulesValidator.validate(deviceData)
        // if (businessError) {
        //   return unprocessableEntity(businessError)
        // }
      }

      const updatedDevice = await this.updateDevice.update(deviceId, deviceData)

      return ok(updatedDevice)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
