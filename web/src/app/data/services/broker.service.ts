import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Broker } from '../models'
import { BrokerCreationData } from '../dtos'

@Injectable()
export class BrokerService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadBrokers (): Observable<Broker[]> {
    return this.http.get<Broker[]>(`${this.url}/brokers`)
  }

  public createBroker (brokerData: BrokerCreationData): Observable<Broker> {
    return this.http.post<Broker>(`${this.url}/brokers`, brokerData)
  }

  public reprocessBroker (brokerId: string): Observable<Broker> {
    return this.http.post<Broker>(`${this.url}/brokers/${brokerId}/reprocessing`, null)
  }
}
