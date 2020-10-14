import { DbLoadBrokerById } from '../../../../data/use-cases/broker/db-load-broker-by-id'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'

export const makeDbLoadBrokerById = (): DbLoadBrokerById => {
  return new DbLoadBrokerById(new BrokerMongoRepository())
}
