
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Collection } from '../models'

@Injectable()
export class CollectionService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadCollections (): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.url}/collections`)
  }
}
