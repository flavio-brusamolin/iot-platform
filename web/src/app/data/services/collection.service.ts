
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Collection } from '../models'

@Injectable()
export class CollectionService {
  private url = environment.api

  constructor (private http: HttpClient) { }

  loadPlans (): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.url}/collections`)
  }
}
