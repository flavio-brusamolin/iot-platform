import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'
import { EstablishBrokerConnection } from '../../domain/use-cases/broker/establish-broker-connection'
import { AsyncHandler, Message } from '../protocols/async-handler'

interface BrokerConnectionPayload extends Broker {
  action: Action
}

export class ProcessBrokerConnectionHandler implements AsyncHandler {
  public constructor (private readonly establishBrokerConnection: EstablishBrokerConnection) {}

  public async handle ({ content: brokerConnectionPayload }: Message<BrokerConnectionPayload>): Promise<void> {
    await this.performConnectionAction(brokerConnectionPayload)
  }

  private performConnectionAction ({ action, ...broker }: BrokerConnectionPayload): any {
    const useCases = {
      [Action.CONNECT]: this.establishBrokerConnection.establishConnection(broker),
      [Action.DISCONNECT]: () => console.log('Disconnecting...')
    }

    return useCases[action]
  }
}
