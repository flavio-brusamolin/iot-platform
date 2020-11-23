import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { Collection } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  public collections$!: Observable<Collection[]>

  public constructor (private readonly collectionService: CollectionService) { }

  public ngOnInit (): void {
    this.loadCollections()
  }

  private loadCollections (): void {
    this.collections$ = this.collectionService.loadCollections()
  }

  public createCollection (): any {
    const collection: any = {
      name: 'Leo'
    }
    this.collectionService.createCollection(collection).subscribe()
    this.loadCollections()
  }
}
