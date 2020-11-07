export class BrokerStatusNotAcceptedError extends Error {
  public constructor () {
    super('The specified broker status is not accepted for this operation')
    this.name = 'BrokerStatusNotAcceptedError'
  }
}
