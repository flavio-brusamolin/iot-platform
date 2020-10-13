import { Document } from 'mongoose'
import { Protocol } from '../../../../domain/enums/protocol'

export interface MongoDevice extends Document {
  _id: any
  collectionId: any
  accessGroupId: any
  name: string
  protocol: Protocol
  mqttInfo?: {
    topic: string
    brokerId: any
  }
}
