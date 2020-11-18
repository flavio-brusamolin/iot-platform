import { MeController } from '../../../../../presentation/controllers/user/me-controller'
import { makeDbLoadUserById } from '../../../use-cases/user/db-load-user-by-id-factory'

export const makeMeController = (): MeController => {
  return new MeController(makeDbLoadUserById())
}
