import { MessageQueueProvider } from '../../infra/message-queue/protocols/message-queue-provider'
import { makeProcessBrokerConnectionHandler } from '../factories/async-handlers/process-broker-connection-handler-factory'
import { makeProcessTopicSubscriptionHandler } from '../factories/async-handlers/process-topic-subscription-handler-factory'

export default (messageQueueProvider: MessageQueueProvider): void => {
  messageQueueProvider.subscribe('broker-connection', makeProcessBrokerConnectionHandler())
  messageQueueProvider.subscribe('topic-subscription', makeProcessTopicSubscriptionHandler())
}
