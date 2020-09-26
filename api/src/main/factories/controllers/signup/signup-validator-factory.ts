import joi from 'joi'
import { JoiAdapter } from '../../../adapters/joi/joi-adapter'

export const makeSignUpValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
  })

  return new JoiAdapter(schema)
}
