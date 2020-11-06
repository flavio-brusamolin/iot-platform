export interface MessageQueueConfig {
  uri: string
  queues: string[]
}

export interface MessageQueueProvider {
  start: (messageQueueConfig: MessageQueueConfig) => Promise<void>
  publish: (queue: string, payload: any) => void
}
