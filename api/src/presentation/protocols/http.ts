export interface HttpRequest<T> {
  body?: T
  headers?: any
  userId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
