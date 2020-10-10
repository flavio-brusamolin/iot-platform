import { Schema, model } from 'mongoose'
import { Role } from '../../../../domain/enums/role'
import { MongoTeam } from './team-mongo-model'

const MemberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(Role)
  }
}, { _id: false })

const TeamMongoSchema = new Schema({
  members: [MemberSchema]
})

export default model<MongoTeam>('teams', TeamMongoSchema)
