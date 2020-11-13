export interface HandleReceivedData {
  handle: (deviceId: string, data: Record<string, unknown>) => Promise<void>
}
