import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Collection } from '../models'
import { CollectionCreationData } from '../dtos'

@Injectable()
export class CollectionService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadCollections (): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.url}/collections`)
  }

  public loadCollectionById (collectionId: string): Observable<Collection> {
    return this.http.get<Collection>(`${this.url}/collections/${collectionId}`)
  }

  public createCollection (collectionData: CollectionCreationData): Observable<Collection> {
    return this.http.post<Collection>(`${this.url}/collections`, collectionData)
  }
}
