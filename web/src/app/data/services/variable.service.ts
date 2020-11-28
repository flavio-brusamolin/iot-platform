
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Variable } from '@angular/compiler/src/render3/r3_ast'
import { VariableCreationData } from '../dtos/variable-creation-data.model'

@Injectable()
export class VariableService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadVariables (deviceId: string): Observable<Variable[]> {
    return this.http.get<Variable[]>(`${this.url}/devices/${deviceId}/variables`)
  }

  public loadVariableById (deviceId: string, variableId: string): Observable<Variable> {
    return this.http.get<Variable>(`${this.url}/devices/${deviceId}/variables/${variableId}`)
  }

  public createVariable (deviceId: string, variableData: VariableCreationData): Observable<Variable> {
    return this.http.post<Variable>(`${this.url}/devices/${deviceId}/variables`, variableData)
  }
}
