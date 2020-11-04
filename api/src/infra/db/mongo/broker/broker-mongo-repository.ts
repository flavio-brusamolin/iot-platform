import { isValidObjectId } from 'mongoose'
import BrokerMongoSchema from './broker-mongo-schema'
import BrokerMongoMapper from './broker-mongo-mapper'
import { AddBrokerRepository, AddBrokerRepositoryModel } from '../../../../data/protocols/db/broker/add-broker-repository'
import { Broker } from '../../../../domain/models/broker'
import { LoadBrokersRepository } from '../../../../data/protocols/db/broker/load-brokers-repository'
import { LoadBrokerByIdRepository } from '../../../../data/protocols/db/broker/load-broker-by-id-repository'

export class BrokerMongoRepository implements AddBrokerRepository, LoadBrokersRepository, LoadBrokerByIdRepository {
  public async add (brokerData: AddBrokerRepositoryModel): Promise<Broker> {
    const brokerRecord = await BrokerMongoSchema.create(brokerData)
    return BrokerMongoMapper.toEntity(brokerRecord)
  }

  public async load (userId: string): Promise<Broker[]> {
    const brokerRecords = await BrokerMongoSchema.find({ userId })
    return brokerRecords.map(BrokerMongoMapper.toEntity)
  }

  public async loadById (brokerId: string): Promise<Broker> {
    if (!isValidObjectId(brokerId)) {
      return null
    }

    const brokerRecord = await BrokerMongoSchema.findById(brokerId)
    return brokerRecord && BrokerMongoMapper.toEntity(brokerRecord)
  }
}
