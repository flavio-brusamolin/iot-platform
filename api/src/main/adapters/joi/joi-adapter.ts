import { ObjectSchema } from 'joi'
import { Validator } from '../../../presentation/protocols'

export class JoiAdapter implements Validator {
  public constructor (private readonly contract: ObjectSchema) { }

  public validate (input: any): Error {
    const { error } = this.contract.validate(input)
    if (error) {
      return new Error(error.message)
    }

    return null
  }
}
