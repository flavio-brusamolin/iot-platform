import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
export class BrokerListComponent implements OnInit {
  public readonly icons = {
    plus: faPlus
  }

  public brokers$!: Observable<Broker[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    public readonly brokerService: BrokerService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void {
    this.loadBrokers()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
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

  public createBroker (brokerData: BrokerCreationData): void {
    this.brokerService.createBroker(brokerData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => this.loadBrokers())
  }
}
