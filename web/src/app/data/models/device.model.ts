export interface device {
    collectionId: any
    accessGroupId: any
    name: string
    protocol: string
    mqttInfo?: {
      topic: string
      brokerId: any
    }
  }
