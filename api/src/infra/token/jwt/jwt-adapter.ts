import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/token/token-generator'

export class JwtAdapter implements TokenGenerator {
  public constructor (
    private readonly secret: string,
    private readonly expiresIn: number
  ) {}

  public async generateToken (id: string): Promise<string> {
    return jwt.sign({ id }, this.secret, { expiresIn: this.expiresIn })
  }
}
