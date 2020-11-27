import { Component, OnInit } from '@angular/core'

import { faSyncAlt, faEllipsisV, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

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
    info: faInfo
  }

  public constructor () { }

  public ngOnInit (): void { }
}
