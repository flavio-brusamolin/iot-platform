import { User } from '../../models/user'

export interface LoadUserById {
    load: (userId: string) => Promise<User>
}
