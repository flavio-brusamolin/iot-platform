export interface HttpRequest<T> {
  body?: T
  params?: any
  headers?: any
  userId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
