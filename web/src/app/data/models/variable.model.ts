interface Data {
  timestamp: Date
  value: number
}

export interface Variable {
  deviceId: string
  accessGroupId: string
  name: string
  key: string
  data?: Data[]
}
