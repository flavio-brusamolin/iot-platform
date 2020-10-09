export class ResourceNotFoundError extends Error {
  public constructor (field: string) {
    super(`The specified ${field} was not found`)
    this.name = 'ResourceNotFoundError'
  }
}
