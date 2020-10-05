import { AddCollection } from '../../../domain/use-cases/collection/add-collection'
import { StartTeam } from '../../../domain/use-cases/team/start-team'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface CreateCollectionContract {
  name: string
}

export class CreateCollectionController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly startTeam: StartTeam,
    private readonly addCollection: AddCollection
  ) {}

  public async handle (httpRequest: HttpRequest<CreateCollectionContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { name } = httpRequest.body

      const { id } = await this.startTeam.start(userId)

      const collection = await this.addCollection.add({
        name,
        accessGroupId: id
      })

      return created(collection)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
