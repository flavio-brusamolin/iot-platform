import { Component, Input, OnInit } from '@angular/core'

import { faSyncAlt, faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { Broker } from 'src/app/data/models'

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

  @Input() public broker!: Broker

  public constructor () { }

  public ngOnInit (): void { }
}
