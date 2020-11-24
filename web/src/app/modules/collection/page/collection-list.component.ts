import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'

import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner'

import { Collection } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'
import { CollectionCreationData } from 'src/app/data/dtos'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public collections$!: Observable<Collection[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly collectionService: CollectionService,
    private readonly notificationService: NotificationService,
    private readonly spinner: NgxSpinnerService
  ) { }

  public ngOnInit (): void {
    this.startSpinner()
    this.loadCollections()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private startSpinner (): void {
    this.spinner.show()
  }

  private loadCollections (): void {
    this.collections$ = this.collectionService
      .loadCollections()
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public createCollection (collectionData: CollectionCreationData): void {
    this.collectionService.createCollection(collectionData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => this.loadCollections())
  }
}
