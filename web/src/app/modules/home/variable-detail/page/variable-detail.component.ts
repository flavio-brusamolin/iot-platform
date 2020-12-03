import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable, of, Subject, timer } from 'rxjs'
import { catchError, concatMap, map } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { VariableService } from 'src/app/data/services/variable.service'
import { Data } from 'src/app/data/models'

interface Info {
  currentValue?: string
  highestValue?: string
  lowestValue?: string
  averageValue?: string
  data: Data[]
}

@Component({
  selector: 'app-variable-detail',
  templateUrl: './variable-detail.component.html',
  styleUrls: ['./variable-detail.component.css']
})
export class VariableDetailComponent implements OnInit {
  private variableId: string

  public info$!: Observable<Info | null>
  public error$ = new Subject<boolean>();

  public constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly variableService: VariableService,
    private readonly notificationService: NotificationService
  ) {
    this.variableId = this.activatedRoute.snapshot.params.variableId
  }

  public ngOnInit (): void {
    this.loadVariable()
  }

  private loadVariable (): void {
    this.info$ = timer(0, 2000).pipe(
      concatMap(() => this.variableService.loadVariableById(this.variableId)),
      map(({ data }) => {
        if (!data.length) {
          return { data }
        }

        const values = data.map(({ value }) => value)

        const currentValue = values[values.length - 1].toFixed(2)
        const highestValue = this.reduceByFn(values, Math.max)
        const lowestValue = this.reduceByFn(values, Math.min)
        const averageValue = this.reduceByFn(values, this.average)

        return {
          currentValue,
          highestValue,
          lowestValue,
          averageValue,
          data
        }
      }),
      catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  private reduceByFn (values: number[], fn: any): string {
    const value = values.reduce((previous, current) => fn(previous, current))
    return value.toFixed(2)
  }

  private average (a: number, b: number): number {
    return (a + b) / 2
  }
}
