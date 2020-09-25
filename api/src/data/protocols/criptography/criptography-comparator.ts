export interface CriptographyComparator {
  compare: (plaintext: string, encryptedValue: string) => Promise<boolean>
}
