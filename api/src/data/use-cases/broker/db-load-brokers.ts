import { Broker } from '../../../domain/models/broker'
import { LoadBrokers } from '../../../domain/use-cases/broker/load-brokers'
import { LoadBrokersRepository } from '../../protocols/db/broker/load-brokers-repository'

export class DbLoadBrokers implements LoadBrokers {
  public constructor (private readonly loadBrokersRepository: LoadBrokersRepository) {}

  public async load (userId: string): Promise<Broker[]> {
    const brokers = await this.loadBrokersRepository.load(userId)
    return brokers
  }
}
