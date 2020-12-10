import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgOption } from '@ng-select/ng-select'
import { Observable, of, Subject } from 'rxjs'
import { catchError, concatMap, map, takeUntil, tap } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { MemberCreationData } from 'src/app/data/dtos'
import { Role } from 'src/app/data/enums/role.enum'
import { Collection, CompleteMemberData } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'
import { TeamService } from 'src/app/data/services/team.service'

interface PageData {
  collection: Collection
  members: CompleteMemberData[]
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  private collectionId: string
  private teamId!: string

  public addMemberForm!: FormGroup

  public pageData$!: Observable<PageData | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public roles: NgOption[] = Object.values(Role).map(role => ({
    label: this.capitalize(role),
    value: role
  }))

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadData()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.addMemberForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required]
    })
  }

  private loadData (): void {
    this.pageData$ = this.collectionService.loadCollectionById(this.collectionId)
      .pipe(concatMap(collection => this.teamService.loadTeamById(collection.accessGroupId).pipe(
        tap(({ id }) => this.teamId = id),
        map(({ members }) => ({ collection, members }))))
      )
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public openAddMemberModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {
          this.addMember(this.addMemberForm.value)
          this.addMemberForm.reset()
        },
        () => this.addMemberForm.reset()
      )
  }

  private addMember (memberData: MemberCreationData): void {
    this.teamService.addMember(this.teamId, memberData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Member successfully added')
          this.loadData()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  public deleteMember (memberId: string): void {
    this.teamService.deleteMember(this.teamId, memberId)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Member successfully removed')
          this.loadData()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  private capitalize (str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
