export interface Credentials {
  userName: string
  password: string
  address: string
  port: string
}

export interface Broker {
    id: string
    userId: string
    name: string
    credentials: Credentials
  }
