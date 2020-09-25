export interface TokenGenerator {
  generateToken: (id: string) => Promise<string>
}
