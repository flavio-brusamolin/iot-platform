import { InitializeConnections } from '../../domain/use-cases/mqtt/initialize-connections'
import { AsyncHandler } from '../protocols/async-handler'

export class ProcessSystemBootHandler implements AsyncHandler {
  public constructor (private readonly initializeConnections: InitializeConnections) {}

  public async handle (): Promise<boolean> {
    try {
      await this.initializeConnections.init()
      return true
    } catch (error) {
      console.error(error)
    }
  }
}
