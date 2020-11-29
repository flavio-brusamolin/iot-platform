import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, map, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { MemberCreationData } from 'src/app/data/dtos'
import { CompleteMemberData } from 'src/app/data/models'
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

  public members$!: Observable<CompleteMemberData[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void {
    this.loadTeam()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadTeam (): void {
    this.members$ = this.teamService
      .loadTeamById('5fbc0302a8f424013090ec00')
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
    this.teamService.addMember('5fc2ca49cf629f00194439ba', memberData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Member successfully added')
          this.loadTeam()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
