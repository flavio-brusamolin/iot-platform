import { LoadBrokers } from '../../../domain/use-cases/broker/load-brokers'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoadBrokersController implements Controller {
  public constructor (private readonly loadBrokers: LoadBrokers) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest

      const brokers = await this.loadBrokers.load(userId)

      return ok(brokers)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
