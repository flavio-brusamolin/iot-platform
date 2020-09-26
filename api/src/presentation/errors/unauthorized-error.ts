export class UnauthorizedError extends Error {
  public constructor () {
    super('Authentication failed')
    this.name = 'UnauthorizedError'
  }
}
