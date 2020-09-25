import bcrypt from 'bcrypt'
import { CriptographyComparator } from '../../../data/protocols/criptography/criptography-comparator'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class BCryptAdapter implements Encrypter, CriptographyComparator {
  public constructor (private readonly salt: number) {}

  public async encrypt (plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }

  public async compare (plaintext: string, encryptedValue: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, encryptedValue)
  }
}
