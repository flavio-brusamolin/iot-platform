export class DuplicateFieldError extends Error {
  public constructor (field: string) {
    super(`The received ${field} is already being used`)
    this.name = 'DuplicateFieldError'
  }
}
