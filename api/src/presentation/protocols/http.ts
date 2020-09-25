export interface HttpRequest<T> {
  body?: T
}

export interface HttpResponse {
  statusCode: number
  body: any
}
