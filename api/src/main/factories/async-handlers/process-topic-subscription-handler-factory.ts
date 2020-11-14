import { ProcessTopicSubscriptionHandler } from '../../../presentation/async-handlers/process-topic-subscription-handler'
import { makeMqttCreateTopicSubscription } from '../use-cases/mqtt/mqtt-create-topic-subscription-factory'
import { makeMqttHandleReceivedData } from '../use-cases/mqtt/mqtt-handle-received-data-factory'
import { makeMqttRemoveTopicSubscription } from '../use-cases/mqtt/mqtt-remove-topic-subscription-factory'

export const makeProcessTopicSubscriptionHandler = (): ProcessTopicSubscriptionHandler => {
  return new ProcessTopicSubscriptionHandler(makeMqttCreateTopicSubscription(), makeMqttHandleReceivedData(), makeMqttRemoveTopicSubscription())
}
