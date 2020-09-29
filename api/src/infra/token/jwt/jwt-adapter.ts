import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/token/token-generator'
import { TokenVerifier } from '../../../data/protocols/token/token-verifier'

export class JwtAdapter implements TokenGenerator, TokenVerifier {
  public constructor (
    private readonly secret: string,
    private readonly expiresIn: number
  ) {}

  public async generateToken (id: string): Promise<string> {
    return jwt.sign({ id }, this.secret, { expiresIn: this.expiresIn })
  }

  public async verifyToken (token: string): Promise<string> {
    const { id }: any = jwt.verify(token, this.secret)
    return id
  }
}
