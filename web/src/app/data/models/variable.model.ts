interface Data {
  timestamp: Date
  value: number
}

export interface Variable {
  deviceId: any
  accessGroupId: any
  name: string
  key: string
  data?: Data[]
}
