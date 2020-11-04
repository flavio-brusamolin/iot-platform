export interface ValidateProtocolRules {
  validate: (mqttInfo: any, broker: any) => Promise<any>
}
