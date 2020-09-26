export class ServerError extends Error {
  public constructor () {
    super('Unexpected error')
    this.name = 'ServerError'
  }
}
