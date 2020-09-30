import { DbCheckUserAuthentication } from '../../../../data/use-cases/user/db-check-user-authentication'
import { JwtAdapter } from '../../../../infra/token/jwt/jwt-adapter'
import env from '../../../config/env'

export const makeDbCheckUserAuthentication = (): DbCheckUserAuthentication => {
  const expiresIn = 43200
  const jwtAdapter = new JwtAdapter(env.jwtSecret, expiresIn)

  return new DbCheckUserAuthentication(jwtAdapter)
}
