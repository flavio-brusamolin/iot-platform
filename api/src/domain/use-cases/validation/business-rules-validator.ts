export interface BusinessRulesValidator {
  validate: (data: any) => Promise<Error>
}
