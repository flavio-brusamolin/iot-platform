interface Data {
  timestamp: Date
  value: string
}

export interface Variable {
  id: string
  deviceId: string
  accessGroupId: string
  name: string
  key: string
  data?: Data[]
}
