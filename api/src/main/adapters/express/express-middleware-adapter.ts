import { RequestHandler } from 'express'
import { HttpRequest, Middleware } from '../../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res, next) => {
    const httpRequest: HttpRequest<any> = {
      headers: req.headers
    }

    const { statusCode, body } = await middleware.handle(httpRequest)

    if (statusCode === 200) {
      Object.assign(req, body)
      next()
    } else {
      res.status(statusCode).json({
        error: body.message
      })
    }
  }
}
