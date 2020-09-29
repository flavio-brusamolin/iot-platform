import { AddBroker, AddBrokerModel } from '../../domain/use-cases/add-broker'
import { Broker } from '../../domain/models/broker'
import { AddBrokerRepository } from '../protocols/db/add-broker-repository'

export class DbAddBroker implements AddBroker {
  public constructor (
    private readonly addBrokerRepository: AddBrokerRepository
  ) {}

  public async add (userData: AddBrokerModel): Promise<Broker> {
    const newBroker = this.addBrokerRepository.add(userData)

    return newBroker
  }
}
