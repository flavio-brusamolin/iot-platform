export interface device {
    collectionId: string
    accessGroupId: string
    name: string
    protocol: string
    mqttInfo?: {
      topic: string
      brokerId: string
    }
  }
