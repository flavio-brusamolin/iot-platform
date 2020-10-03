import { DbLoadBrokers } from '../../../../data/use-cases/broker/db-load-brokers'
import { BrokerMongoRepository } from '../../../../infra/db/mongo/broker/broker-mongo-repository'

export const makeDbLoadBrokers = (): DbLoadBrokers => {
  return new DbLoadBrokers(new BrokerMongoRepository())
}
