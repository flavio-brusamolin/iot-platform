import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { VariableCreationData } from '../dtos'
import { Variable } from '../models'

@Injectable()
export class VariableService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadVariables (deviceId: string): Observable<Variable[]> {
    return this.http.get<Variable[]>(`${this.url}/devices/${deviceId}/variables`)
  }

  public createVariable (deviceId: string, variableData: VariableCreationData): Observable<Variable> {
    return this.http.post<Variable>(`${this.url}/devices/${deviceId}/variables`, variableData)
  }

  public loadVariableById (variableId: string): Observable<Required<Variable>> {
    return this.http.get<Required<Variable>>(`${this.url}/variables/${variableId}`)
  }
}
