import { LoadCollections } from '../../../domain/use-cases/collection/load-collections'
import { LoadTeams } from '../../../domain/use-cases/team/load-teams'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadCollectionsController implements Controller {
  public constructor (
    private readonly loadTeams: LoadTeams,
    private readonly loadCollections: LoadCollections
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest

      const teams = await this.loadTeams.load(userId)
      const accessGroupIds = teams.map(({ id }) => id)

      const collections = await this.loadCollections.load(accessGroupIds)

      return ok(collections)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
