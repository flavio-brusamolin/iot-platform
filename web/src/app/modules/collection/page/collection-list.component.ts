import { Component, OnDestroy, OnInit } from '@angular/core'

import { Observable, Subject } from 'rxjs'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Collection } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'
import { CollectionCreationData } from 'src/app/data/dtos'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public collections$!: Observable<Collection[]>
  private unsub$ = new Subject<void>()

  public constructor (private readonly collectionService: CollectionService) { }

  public ngOnInit (): void {
    this.loadCollections()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadCollections (): void {
    this.collections$ = this.collectionService.loadCollections()
  }

  public createCollection (collectionData: CollectionCreationData): void {
    this.collectionService.createCollection(collectionData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => this.loadCollections())
  }
}
