import { HttpResponse } from '../protocols'
import { PermissionDeniedError, ServerError, UnauthorizedError } from '../errors'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  body: new PermissionDeniedError()
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
