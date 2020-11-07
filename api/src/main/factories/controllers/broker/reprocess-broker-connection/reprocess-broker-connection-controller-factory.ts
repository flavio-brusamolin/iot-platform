import { ReprocessBrokerConnectionController } from '../../../../../presentation/controllers/broker/reprocess-broker-connection-controller'
import { makeDbLoadBrokerById } from '../../../use-cases/broker/db-load-broker-by-id-factory'
import { makeDbReprocessBrokerConnection } from '../../../use-cases/broker/db-reprocess-broker-connection-factory'

export const makeReprocessBrokerConnectionController = (): ReprocessBrokerConnectionController => {
  return new ReprocessBrokerConnectionController(makeDbLoadBrokerById(), makeDbReprocessBrokerConnection())
}
