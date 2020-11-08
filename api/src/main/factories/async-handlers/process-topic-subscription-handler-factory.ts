import { ProcessTopicSubscriptionHandler } from '../../../presentation/async-handlers/process-topic-subscription-handler'

export const makeProcessTopicSubscriptionHandler = (): ProcessTopicSubscriptionHandler => {
  return new ProcessTopicSubscriptionHandler()
}
