import { Schema, model } from 'mongoose'

const MemberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { _id: false })

const TeamMongoSchema = new Schema({
  members: [MemberSchema]
})

export default model('teams', TeamMongoSchema)
