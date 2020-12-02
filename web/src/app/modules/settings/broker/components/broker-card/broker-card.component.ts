import { Component, Input, OnInit } from '@angular/core'

import { faSyncAlt, faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { Broker } from 'src/app/data/models'
import { BrokerService } from 'src/app/data/services/broker.service'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { NotificationService } from 'src/app/core/services/notification.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-broker-card',
  templateUrl: './broker-card.component.html',
  styleUrls: ['./broker-card.component.css']
})
export class BrokerCardComponent implements OnInit {
  public readonly icons = {
    active: faCheckCircle,
    inactive: faTimesCircle,
    processing: faSyncAlt,
    options: faEllipsisV,
    info: faInfoCircle
  }

  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()
  @Input() public broker!: Broker

  public constructor (
    private readonly brokerService: BrokerService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void { }

  public reprocessBroker (broker: Broker): void {
    this.brokerService.reprocessBroker(broker.id)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Broker ' + broker.name + ' is reprocessing!')
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
