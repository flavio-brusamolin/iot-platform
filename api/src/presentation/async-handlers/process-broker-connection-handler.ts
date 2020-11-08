import { Action } from '../../domain/enums/action'
import { Broker } from '../../domain/models/broker'
import { AsyncHandler, Message } from '../protocols/async-handler'

interface BrokerConnectionPayload extends Broker {
  action: Action
}

export class ProcessBrokerConnectionHandler implements AsyncHandler {
  public async handle ({ content }: Message<BrokerConnectionPayload>): Promise<void> {
    console.log('Processing broker connection...', content)
  }
}
