export class PermissionDeniedError extends Error {
  public constructor () {
    super('Permission denied')
    this.name = 'PermissionDeniedError'
  }
}
