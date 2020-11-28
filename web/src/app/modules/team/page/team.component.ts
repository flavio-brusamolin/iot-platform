import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, map, takeUntil } from 'rxjs/operators'
import { NotificationService } from 'src/app/core/services/notification.service'
import { MemberCreation } from 'src/app/data/dtos'
import { Member } from 'src/app/data/models'
import { TeamService } from 'src/app/data/services/team.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public readonly icons = {
    plus: faPlus
  }

  public members$!: Observable<Member[] | null>
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
    this.members$ = this.teamService.loadTeamById('5fbda32e6cb24d001aeae18d').pipe(
      map(team => team.members),
      catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public createMember (memberData: MemberCreation): void {
    this.teamService.addMember('5fc1a13c385c6a0019b49565', memberData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => this.loadTeam())
  }
}
