export interface Broker {
    userId: string
    name: string
    status: string
    credentials: {
      username: string
      password: string
      address: string
      port: number
    }
}
