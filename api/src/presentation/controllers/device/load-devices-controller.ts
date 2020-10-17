import { Role } from '../../../domain/enums/role'
import { LoadCollectionById } from '../../../domain/use-cases/collection/load-collection-by-id'
import { LoadDevices } from '../../../domain/use-cases/device/load-devices'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { ResourceNotFoundError } from '../../errors'
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadDevicesController implements Controller {
  public constructor (
    private readonly loadCollectionById: LoadCollectionById,
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly loadDevices: LoadDevices
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { collectionId } = httpRequest.params

      const collection = await this.loadCollectionById.load(collectionId)
      if (!collection) {
        return notFound(new ResourceNotFoundError('collection id'))
      }

      const hasPermission = await this.checkMemberPermission.check(collection.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      const devices = await this.loadDevices.load(collectionId)

      return ok(devices)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
