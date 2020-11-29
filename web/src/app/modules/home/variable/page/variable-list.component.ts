import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { VariableCreationData } from 'src/app/data/dtos'
import { VariableService } from 'src/app/data/services/variable.service'
import { Variable } from 'src/app/data/models'

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public variables$!: Observable<Variable[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  private deviceId: string

  public constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly variableService: VariableService,
    private notificationService: NotificationService
  ) {
    this.deviceId = this.activatedRoute.snapshot.params.deviceId
  }

  public ngOnInit (): void {
    this.loadVariables()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadVariables (): void {
    this.variables$ = this.variableService
      .loadVariables(this.deviceId)
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public createVariable (variableData: VariableCreationData): void {
    this.variableService.createVariable(this.deviceId, variableData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Variable successfully created')
          this.loadVariables()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
