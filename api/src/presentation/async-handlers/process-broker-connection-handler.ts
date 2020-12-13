import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'
import { EstablishBrokerConnection } from '../../domain/use-cases/mqtt/establish-broker-connection'
import { KillBrokerConnection } from '../../domain/use-cases/mqtt/kill-broker-connection'
import { AsyncHandler, Message } from '../protocols/async-handler'

interface BrokerConnectionPayload extends Broker {
  action: Action
}

export class ProcessBrokerConnectionHandler implements AsyncHandler {
  public constructor (
    private readonly establishBrokerConnection: EstablishBrokerConnection,
    private readonly killBrokerConnection: KillBrokerConnection
  ) {}

  public async handle ({ content: { action, ...broker } }: Message<BrokerConnectionPayload>): Promise<boolean> {
    try {
      if (action === Action.CONNECT) {
        await this.establishBrokerConnection.establishConnection(broker)
      }

      if (action === Action.DISCONNECT) {
        await this.killBrokerConnection.killConnection(broker)
      }

      return true
    } catch (error) {
      console.error(error)
      return true
    }
  }
}
