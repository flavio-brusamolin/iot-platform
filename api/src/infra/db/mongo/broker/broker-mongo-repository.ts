import BrokerMongoSchema from './broker-mongo-schema'
import BrokerMongoMapper from './broker-mongo-mapper'
import { AddBrokerRepository } from '../../../../data/protocols/db/broker/add-broker-repository'
import { Broker } from '../../../../domain/models/broker'
import { AddBrokerModel } from '../../../../domain/use-cases/broker/add-broker'

export class BrokerMongoRepository implements AddBrokerRepository {
  public async add (brokerData: AddBrokerModel): Promise<Broker> {
    const brokerRecord = await BrokerMongoSchema.create(brokerData)
    return brokerRecord && BrokerMongoMapper.toEntity(brokerRecord)
  }
}
