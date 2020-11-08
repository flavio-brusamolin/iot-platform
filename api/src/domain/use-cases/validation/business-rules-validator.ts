export interface BusinessRulesValidator {
  validate: (data: any, mustValidateBrokerId: boolean) => Promise<Error>
}
