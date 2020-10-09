import joi from 'joi'
import { Role } from '../../../../../domain/enums/role'
import { JoiAdapter } from '../../../../adapters/joi/joi-adapter'

export const makeAddMemberValidator = (): JoiAdapter => {
  const schema = joi.object({
    email: joi.string().required().email(),
    role: joi.string().valid(...Object.values(Role))
  })

  return new JoiAdapter(schema)
}
