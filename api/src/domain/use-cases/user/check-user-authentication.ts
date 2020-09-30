export interface CheckUserAuthentication {
  checkAuthentication: (token: string) => Promise<string>
}
