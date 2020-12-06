import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

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

  private deviceId: string

  public createVariableForm!: FormGroup

  public variables$!: Observable<Variable[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly variableService: VariableService,
    private readonly notificationService: NotificationService
  ) {
    this.deviceId = this.activatedRoute.snapshot.params.deviceId
  }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadVariables()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.createVariableForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      key: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })
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

  public openCreateVariableModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {
          this.createVariable(this.createVariableForm.value)
          this.createVariableForm.reset()
        },
        () => this.createVariableForm.reset()
      )
  }

  private createVariable (variableData: VariableCreationData): void {
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
