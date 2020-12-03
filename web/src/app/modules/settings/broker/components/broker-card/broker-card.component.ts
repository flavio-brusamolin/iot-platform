import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { faCheck, faTimes, faSyncAlt, faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { Broker } from 'src/app/data/models'

@Component({
  selector: 'app-broker-card',
  templateUrl: './broker-card.component.html',
  styleUrls: ['./broker-card.component.css']
})
export class BrokerCardComponent implements OnInit {
  public readonly icons: any = {
    active: faCheck,
    inactive: faTimes,
    processing: faSyncAlt,
    options: faEllipsisV,
    info: faInfoCircle
  }

  @Output() reprocessBrokerEmitter = new EventEmitter()

  @Input() public broker!: Broker

  public constructor () { }

  public ngOnInit (): void { }
}
