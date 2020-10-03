export interface Broker {
  id: string
  userId: string
  name: string
  credentials: {
    username: string
    password: string
    address: string
    port: number
  }
}