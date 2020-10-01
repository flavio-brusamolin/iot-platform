import BrokerMongoSchema from './broker-mongo-schema'
import BrokerMongoMapper from './broker-mongo-mapper'
import { AddBrokerRepository } from '../../../../data/protocols/db/broker/add-broker-repository'
import { Broker } from '../../../../domain/models/broker'
import { AddBrokerModel } from '../../../../domain/use-cases/broker/add-broker'
import { LoadBrokersRepository } from '../../../../data/protocols/db/broker/load-brokers-repository'

export class BrokerMongoRepository implements AddBrokerRepository, LoadBrokersRepository {
  public async add (brokerData: AddBrokerModel): Promise<Broker> {
    const brokerRecord = await BrokerMongoSchema.create(brokerData)
    return brokerRecord && BrokerMongoMapper.toEntity(brokerRecord)
  }

  public async load (userId: string): Promise<Broker[]> {
    const brokers: Broker[] = (await BrokerMongoSchema.find().where({ userId })).map((record) => { return BrokerMongoMapper.toEntity(record) })
    return brokers
  }
}
