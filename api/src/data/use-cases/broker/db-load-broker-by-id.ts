import { Broker } from '../../../domain/models/broker'
import { LoadBrokerById } from '../../../domain/use-cases/broker/load-broker-by-id'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'

export class DbLoadBrokerById implements LoadBrokerById {
  public constructor (private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository) {}

  public async load (brokerId: string, userId: string): Promise<Broker> {
    const broker = await this.loadBrokerByIdRepository.loadById(brokerId)

    if (!broker || (broker.userId !== userId)) {
      return null
    }

    return broker
  }
}
