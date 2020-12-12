import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable, of, Subject, timer } from 'rxjs'
import { catchError, concatMap, map, takeUntil } from 'rxjs/operators'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { NotificationService } from 'src/app/core/services/notification.service'
import { VariableService } from 'src/app/data/services/variable.service'
import { Data } from 'src/app/data/models'
import { VariableDataSending } from 'src/app/data/dtos'

interface Info {
  name: string
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
export class VariableDetailComponent implements OnInit, OnDestroy {
  public readonly icons = {
    send: faPaperPlane
  }

  private variableId: string

  public sendDataForm!: FormGroup

  public info$!: Observable<Info | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly variableService: VariableService,
    private readonly notificationService: NotificationService
  ) {
    this.variableId = this.activatedRoute.snapshot.params.variableId
  }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadVariable()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.sendDataForm = this.formBuilder.group({
      value: ['', Validators.required]
    })
  }

  private loadVariable (): void {
    this.info$ = timer(0, 2000).pipe(
      concatMap(() => this.variableService.loadVariableById(this.variableId)),
      map(({ name, data }) => {
        if (!data.length) {
          return { name, data }
        }

        const values = data.map(({ value }) => value)

        const currentValue = values[values.length - 1].toFixed(2)
        const highestValue = this.reduceByFn(values, Math.max)
        const lowestValue = this.reduceByFn(values, Math.min)
        const averageValue = this.reduceByFn(values, this.average)

        return {
          name,
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

  public openSendDataModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {
          this.sendData(this.sendDataForm.value)
          this.sendDataForm.reset()
        },
        () => this.sendDataForm.reset()
      )
  }

  private sendData (data: VariableDataSending): void {
    this.variableService.sendVariableData(this.variableId, data)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => this.notificationService.success('Very well!', 'Data successfully sent'),
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  private reduceByFn (values: number[], fn: any): string {
    const value = values.reduce((previous, current) => fn(previous, current))
    return value.toFixed(2)
  }

  private average (a: number, b: number): number {
    return (a + b) / 2
  }
}
