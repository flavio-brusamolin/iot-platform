import { LoadBrokerById } from '../../../domain/use-cases/broker/load-broker-by-id'
import { ReprocessBrokerConnection } from '../../../domain/use-cases/broker/reprocess-broker-connection'
import { BrokerStatusNotAcceptedError, ResourceNotFoundError } from '../../errors'
import { notFound, ok, serverError, unprocessableEntity } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class ReprocessBrokerConnectionController implements Controller {
  public constructor (
    private readonly loadBrokerById: LoadBrokerById,
    private readonly reprocessBrokerConnection: ReprocessBrokerConnection
  ) {}

  public async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest
      const { brokerId } = httpRequest.params

      const broker = await this.loadBrokerById.load(brokerId, userId)
      if (!broker) {
        return notFound(new ResourceNotFoundError('broker id'))
      }

      const updatedBroker = await this.reprocessBrokerConnection.reprocess(broker)
      if (!updatedBroker) {
        return unprocessableEntity(new BrokerStatusNotAcceptedError())
      }

      return ok(updatedBroker)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
