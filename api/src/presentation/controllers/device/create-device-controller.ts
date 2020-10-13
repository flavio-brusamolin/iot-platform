import { Protocol } from '../../../domain/enums/protocol'
import { Role } from '../../../domain/enums/role'
import { LoadBrokerById } from '../../../domain/use-cases/broker/load-broker-by-id'
import { LoadCollectionById } from '../../../domain/use-cases/collection/load-collection-by-id'
import { AddDevice } from '../../../domain/use-cases/device/add-device'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { ResourceNotFoundError } from '../../errors'
import { badRequest, created, forbidden, notFound, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface CreateDeviceContract {
  name: string
  protocol: Protocol
  mqttInfo?: {
    topic: string
    brokerId: string
  }
}

export class CreateDeviceController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly loadCollectionById: LoadCollectionById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly loadBrokerById: LoadBrokerById,
    private readonly addDevice: AddDevice
  ) {}

  public async handle (httpRequest: HttpRequest<CreateDeviceContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { collectionId } = httpRequest.params
      const { name, protocol, mqttInfo } = httpRequest.body

      const collection = await this.loadCollectionById.load(collectionId)
      if (!collection) {
        return notFound(new ResourceNotFoundError('collection id'))
      }

      const { accessGroupId } = collection

      const hasPermission = await this.checkMemberPermission.check(accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const broker = await this.loadBrokerById.load(mqttInfo.brokerId)
      if (!broker) {
        return notFound(new ResourceNotFoundError('broker id'))
      }

      const device = await this.addDevice.add({
        collectionId,
        accessGroupId,
        name,
        protocol,
        mqttInfo
      })

      return created(device)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
