import { AsyncHandler } from '../../../presentation/protocols/async-handler'

export interface MessageQueueConfig {
  uri: string
  queues: string[]
}

export interface MessageQueueProvider {
  start: (messageQueueConfig: MessageQueueConfig) => Promise<void>
  publish: (queue: string, payload: any) => any
  subscribe: (queue: string, asyncHandler: AsyncHandler) => any
}
