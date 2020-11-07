export class InactiveBrokerError extends Error {
  public constructor () {
    super('The specified broker is inactive')
    this.name = 'InactiveBrokerError'
  }
}
