import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: null
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
