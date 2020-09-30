import joi from 'joi'
import { JoiAdapter } from '../../../../adapters/joi/joi-adapter'

export const makeSignInValidator = (): JoiAdapter => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
  })

  return new JoiAdapter(schema)
}
