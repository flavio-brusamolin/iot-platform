import { Broker } from '../../../../domain/models/broker'

export interface LoadBrokersRepository {
  load: (userId: string) => Promise<Broker[]>
}
