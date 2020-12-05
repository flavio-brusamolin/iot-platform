import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { BrokerCreationData } from 'src/app/data/dtos'
import { Broker } from 'src/app/data/models'
import { BrokerService } from 'src/app/data/services/broker.service'

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.css']
})
export class BrokerListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public createBrokerForm!: FormGroup

  public brokers$!: Observable<Broker[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly brokerService: BrokerService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadBrokers()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.createBrokerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      credentials: this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        address: ['', Validators.required],
        port: ['', [Validators.required, Validators.min(0)]]
      })
    })
  }

  private loadBrokers (): void {
    this.brokers$ = this.brokerService
      .loadBrokers()
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public openCreateBrokerModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => this.createBroker(this.createBrokerForm.value),
        () => this.createBrokerForm.reset()
      )
  }

  public createBroker (brokerData: BrokerCreationData): void {
    this.brokerService.createBroker(brokerData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Broker successfully registered')
          this.loadBrokers()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  public reprocessBroker (broker: Broker): void {
    this.brokerService.reprocessBroker(broker.id)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Broker ' + broker.name + ' is reprocessing!')
          this.loadBrokers()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
