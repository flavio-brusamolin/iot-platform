import { MessageQueueProvider } from '../../infra/message-queue/protocols/message-queue-provider'
import { makeProcessBrokerConnectionHandler } from '../factories/async-handlers/process-broker-connection-handler-factory'
import { makeProcessTopicSubscriptionHandler } from '../factories/async-handlers/process-topic-subscription-handler-factory'
import { makeProcessSystemBootHandler } from '../factories/async-handlers/process-system-boot-handler-factory'

export default (messageQueueProvider: MessageQueueProvider): void => {
  messageQueueProvider.subscribe('system-boot', makeProcessSystemBootHandler())
  messageQueueProvider.subscribe('broker-connection', makeProcessBrokerConnectionHandler())
  messageQueueProvider.subscribe('topic-subscription', makeProcessTopicSubscriptionHandler())

  messageQueueProvider.publish('system-boot')
}
