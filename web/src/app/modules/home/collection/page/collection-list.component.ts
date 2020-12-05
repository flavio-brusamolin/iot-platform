import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

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

  public createCollectionForm!: FormGroup

  public collections$!: Observable<Collection[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly collectionService: CollectionService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadCollections()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.createCollectionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })
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

  public openCreateCollectionModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => this.createCollection(this.createCollectionForm.value),
        () => this.createCollectionForm.reset()
      )
  }

  public createCollection (collectionData: CollectionCreationData): void {
    this.collectionService.createCollection(collectionData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Collection successfully created')
          this.loadCollections()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
