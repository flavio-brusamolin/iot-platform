import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest<any>) => Promise<HttpResponse>
}
