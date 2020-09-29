import { AddBroker } from '../../../domain/use-cases/add-broker'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface CreateBrokerContract {
  name: string
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}

export class CreateBrokerController implements Controller {
  public constructor (
    private readonly validator: Validator,
    private readonly addBroker: AddBroker
  ) {}

  public async handle (httpRequest: HttpRequest<CreateBrokerContract>): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest
      const { name, credentials } = httpRequest.body

      const broker = await this.addBroker.add({
        userId,
        name,
        credentials
      })

      return created(broker)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
