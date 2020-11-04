import { AddBroker, AddBrokerModel } from '../../../domain/use-cases/broker/add-broker'
import { Broker } from '../../../domain/models/broker'
import { AddBrokerRepository } from '../../protocols/db/broker/add-broker-repository'
import { BrokerStatus } from '../../../domain/enums/broker-status'
import { PublishBrokerConnectionQueue } from '../../protocols/message-queue/publish-broker-connection-queue'
import { Action } from '../../../domain/enums/action'

export class DbAddBroker implements AddBroker {
  public constructor (
    private readonly addBrokerRepository: AddBrokerRepository,
    private readonly publishBrokerConnectionQueue: PublishBrokerConnectionQueue
  ) {}

  public async add (brokerData: AddBrokerModel): Promise<Broker> {
    const broker = await this.addBrokerRepository.add({
      ...brokerData,
      status: BrokerStatus.PROCESSING
    })

    await this.publishBrokerConnectionQueue.publishBrokerConnection(broker, Action.CONNECT)

    return broker
  }
}
