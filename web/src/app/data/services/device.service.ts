import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Device } from '../models'
import { DeviceCreationData } from '../dtos'

@Injectable()
export class DeviceService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadDevices (collectionId: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}/collections/${collectionId}/devices`)
  }

  public loadDeviceById (deviceId: string): Observable<Device> {
    return this.http.get<Device>(`${this.url}/devices/${deviceId}`)
  }

  public createDevice (collectionId: string, deviceData: DeviceCreationData): Observable<Device> {
    return this.http.post<Device>(`${this.url}/collections/${collectionId}/devices`, deviceData)
  }

  public updateDevice (deviceId: string, deviceData: Partial<DeviceCreationData>): Observable<Device> {
    return this.http.patch<Device>(`${this.url}/devices/${deviceId}`, deviceData)
  }
}
