import { AddBroker, AddBrokerModel } from '../../../domain/use-cases/broker/add-broker'
import { Broker } from '../../../domain/models/broker'
import { AddBrokerRepository } from '../../protocols/db/broker/add-broker-repository'
import { BrokerStatus } from '../../../domain/enums/broker-status'

export class DbAddBroker implements AddBroker {
  public constructor (private readonly addBrokerRepository: AddBrokerRepository) {}

  public async add (brokerData: AddBrokerModel): Promise<Broker> {
    return await this.addBrokerRepository.add({
      ...brokerData,
      status: BrokerStatus.PROCESSING
    })
  }
}
