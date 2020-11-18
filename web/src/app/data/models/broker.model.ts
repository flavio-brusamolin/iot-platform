export interface Broker {
    userId: any
    name: string
    status: string
    credentials: {
      username: string
      password: string
      address: string
      port: number
    }
}
