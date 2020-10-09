import { User } from '../../models/user'

export interface LoadUserByEmail {
    load: (email: string) => Promise<User>
}
