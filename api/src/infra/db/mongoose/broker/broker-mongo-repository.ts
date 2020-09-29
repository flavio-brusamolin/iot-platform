import UserMongoSchema from './broker-mongo-schema'
import UserMongoMapper from './broker-mongo-mapper'
import { AddBrokerRepository } from '../../../../data/protocols/db/add-broker-repository'
import { Broker } from '../../../../domain/models/broker'
import { AddBrokerModel } from '../../../../domain/use-cases/add-broker'

export class BrokerMongoRepository implements AddBrokerRepository {

  public async add (userData: AddBrokerModel): Promise<Broker> {
    const userRecord = await UserMongoSchema.create(userData)
    return userRecord && UserMongoMapper.toEntity(userRecord)
  }
}
