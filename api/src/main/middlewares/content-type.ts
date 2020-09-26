import { RequestHandler } from 'express'

export const contentType: RequestHandler = (_req, res, next): void => {
  res.type('json')
  next()
}
