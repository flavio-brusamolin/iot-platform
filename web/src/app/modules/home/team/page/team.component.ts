import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, map, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { MemberCreationData } from 'src/app/data/dtos'
import { Role } from 'src/app/data/enums/role.enum'
import { Collection, CompleteMemberData } from 'src/app/data/models'
import { CollectionService } from 'src/app/data/services/collection.service'
import { TeamService } from 'src/app/data/services/team.service'

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
  private accessGroupId: any

  public role = Role.BASIC // temporary

  public collection$!: Observable<Collection | null>
  public members$!: Observable<CompleteMemberData[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    this.loadCollection()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadCollection (): void {
    this.collectionService
      .loadCollectionById(this.collectionId)
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
      .subscribe(collection => {
        this.loadTeam(collection?.accessGroupId)
        this.accessGroupId = collection?.accessGroupId
      })
  }

  private loadTeam (accessGroupId: any): void {
    this.members$ = this.teamService
      .loadTeamById(accessGroupId)
      .pipe(
        map(team => team.members),
        catchError(({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)

          this.notificationService.error('Error!', httpError.error)
          this.error$.next(true)

          return of(null)
        })
      )
  }

  public addMember (memberData: MemberCreationData): void {
    this.teamService.addMember(this.accessGroupId, memberData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Member successfully added')
          this.loadTeam(this.accessGroupId)
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  public deleteMember (member: CompleteMemberData): void {
    this.teamService.deleteMember(this.accessGroupId, member.id)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Member successfully deleted.!')
          this.loadTeam(this.accessGroupId)
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
