export interface Message<T> {
  content: T
}

export interface AsyncHandler {
  handle: (message: Message<any>) => Promise<boolean>
}
