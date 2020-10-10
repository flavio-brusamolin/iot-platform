import { Document } from 'mongoose'
import { Role } from '../../../../domain/enums/role'

interface MongoMember {
  userId: any
  role: Role
}

export interface MongoTeam extends Document {
  _id: any
  members: MongoMember[]
}
