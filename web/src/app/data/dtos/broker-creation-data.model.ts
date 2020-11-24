export interface BrokerCreationData {
  name: string,
  credentials: {
    username: string,
    password: string,
    address: string,
    port: number
  }
}
