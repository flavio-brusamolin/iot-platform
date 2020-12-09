import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { faTrashAlt, faUser, faEnvelope, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { of, Subject } from 'rxjs'
import { Observable } from 'rxjs/internal/Observable'
import { takeUntil } from 'rxjs/internal/operators/takeUntil'
import { catchError } from 'rxjs/operators'
import { NotificationService } from 'src/app/core/services/notification.service'
import { Collection, CompleteMemberData } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'
import { TeamService } from 'src/app/data/services/team.service'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  public readonly icons = {
    remove: faTrashAlt,
    user: faUser,
    mail: faEnvelope,
    permission: faShieldAlt
  }

  private collectionId: string
  private accessGroupId: any

  public collection$!: Observable<Collection | null>
  public members$!: Observable<CompleteMemberData[] | null>
  public error$ = new Subject<boolean>()

  private unsub$ = new Subject<void>()

  public form!: FormGroup

  @Output() deleteMemberEmitter = new EventEmitter()

  @Input() public member!: CompleteMemberData

  public constructor (
    private formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService,
    private modal: NgbModal
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    // this.loadCollection()
    this.initializeForms()
  }

  private initializeForms (): void {
    this.form = this.formBuilder.group({
    })
  }

  // private loadCollection (): void {
  //   this.collectionService
  //     .loadCollectionById(this.collectionId)
  //     .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
  //       console.error(httpError)

  //       this.notificationService.error('Error!', httpError.error)
  //       this.error$.next(true)

  //       return of(null)
  //     }))
  //     .subscribe(collection => {
  //       this.accessGroupId = collection?.accessGroupId
  //     })
  // }

  public openConfirmModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {},
        () => {
          this.form.reset()
        }
      )
  }

  // public deleteMember (memberId: string): void {
  //   this.modal.dismissAll()
  //   this.teamService.deleteMember(this.accessGroupId, memberId)
  //     .pipe(takeUntil(this.unsub$))
  //     .subscribe(
  //       () => {
  //         this.notificationService.success('Very well!', 'Member successfully deleted. Refresh your page!')
  //       },
  //       ({ error: httpError }: HttpErrorResponse) => {
  //         console.error(httpError)
  //         this.notificationService.error('Error!', httpError.error)
  //       }
  //     )
  // }
}
