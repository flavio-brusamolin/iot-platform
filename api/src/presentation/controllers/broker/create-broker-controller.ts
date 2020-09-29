import { AddBroker } from '../../../domain/use-cases/add-broker'
import { DuplicateFieldError } from '../../errors'
import { badRequest, conflict, created, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validator } from '../../protocols'

interface CreateBrokerContract {
  userId: string
  name: string
  credentials: {
    userName: string
    password: string
    address: string
    port: string
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

      const { name, credentials } = httpRequest.body
      const userId = httpRequest.userId

      const broker = await this.addBroker.add({
        name,
        userId,
        credentials
      })

      if (!broker) {
        return conflict(new DuplicateFieldError('name'))
      }

      return created({ broker })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
