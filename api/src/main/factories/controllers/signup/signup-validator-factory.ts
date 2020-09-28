import joi from 'joi'
import { JoiAdapter } from '../../../adapters/joi/joi-adapter'

export const makeSignUpValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(30),
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
  })

  return new JoiAdapter(schema)
}
