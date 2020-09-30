export interface AuthenticateUserModel {
  email: string
  password: string
}

export interface AuthenticateUser {
  authenticate: (credentials: AuthenticateUserModel) => Promise<string>
}
