export interface TokenVerifier {
  verifyToken: (token: string) => Promise<string>
}
