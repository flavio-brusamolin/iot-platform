import { Role } from '../../../domain/enums/role'
import { LoadCollectionById } from '../../../domain/use-cases/collection/load-collection-by-id'
import { CheckMemberPermission } from '../../../domain/use-cases/team/check-member-permission'
import { forbidden, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadCollectionByIdController implements Controller {
  public constructor (
    private readonly checkMemberPermission: CheckMemberPermission,
    private readonly loadCollectionById: LoadCollectionById
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { collectionId } = httpRequest.params

      const collection = await this.loadCollectionById.load(collectionId)

      const hasPermission = await this.checkMemberPermission.check(collection.accessGroupId, userId, [Role.BASIC, Role.ADVANCED])
      if (!hasPermission) {
        return forbidden()
      }

      return ok(collection)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
