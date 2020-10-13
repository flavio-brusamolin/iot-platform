import { Broker } from '../../../domain/models/broker'
import { LoadBrokerById } from '../../../domain/use-cases/Broker/load-broker-by-id'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'

export class DbLoadBrokerById implements LoadBrokerById {
  public constructor (private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository) {}

  public async load (id: string): Promise<Broker> {
    return await this.loadBrokerByIdRepository.loadById(id)
  }
}
